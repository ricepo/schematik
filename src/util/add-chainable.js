// -------------------------------------------------------------------------- //
//                                                                            //
// Adds a chainable method to the specified object.                           //
//                                                                            //
// -------------------------------------------------------------------------- //

// This file is a Schematik-specific ES6 rewrite of:
//   chaijs/chai/lib/chai/utils/addChainableMethod.js

import methods      from './symbols';
import isSchematik  from './is-schematik';

// Check for __proto__ support
const supportsProto = '__proto__' in Object;

// Regex for function prototype methods that cannot be overwritten
const excludeNames  = /^(?:length|name|arguments|caller)$/;

// Default function properties
const call          = Function.prototype.call;
const apply         = Function.prototype.apply;


// Adds a chainable method to the specified object
export default function addChainable(context, name, call, get) {
  if (typeof get !== 'function') { get = function() { }; }

  let behavior = { call: call, get: get };

  // Save methods for later overwrites
  if (!context[methods]) { context[methods] = { }; }
  context[methods][name] = behavior;

  // Attach the chainable method to the object
  Object.defineProperty(context, name, {
    configurable: true,
    get: function() {
      // Allow onGet to make changes to the Schematik
      // If changes are made, a new Schematik will be returned
      let self = behavior.get.call(this);
      if (self === undefined) { self = this; }
      if (!isSchematik(self)) {
        throw new Error('get() must return a Schematik object or undefined.');
      }

      // Construct the wrapper function for the onCall
      let wrapper = function wrapper() {
        let result = behavior.call.apply(self, arguments);
        self = self.flag('chain', null);
        return result === undefined ? self : result;
      };

      // Make the wrapper act like Schematik
      let prototype = Object.create(self);
      Object.setPrototypeOf(wrapper, prototype);
      prototype.call  = call;
      prototype.apply = apply;

      self.flag('chain', wrapper).copyTo(wrapper);
      return wrapper;
    }
  });

}
