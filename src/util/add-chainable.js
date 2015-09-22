/**
 * Schematik.util.addChainable
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */


// This file is a Schematik-specific ES6 rewrite of:
//   chaijs/chai/lib/chai/utils/addChainableMethod.js

import methods      from './symbols';
import isSchematik  from './is-schematik';

const apply         = Function.prototype.apply;


// Adds a chainable method to the specified object
export default function addChainable(context, name, call, get) {
  if (typeof get !== 'function') { get = function() { }; }

  const behavior = { call: call, get: get };

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
      const wrapper = function wrapper() {
        const result = behavior.call.apply(self, arguments);
        self = self.flag('chain', null);
        return result === undefined ? self : result;
      };

      // Make the wrapper act like Schematik
      const prototype = Object.create(self);
      Object.setPrototypeOf(wrapper, prototype);
      prototype.call  = call;
      prototype.apply = apply;

      self.flag('chain', wrapper).copyTo(wrapper);
      return wrapper;
    }
  });

}
