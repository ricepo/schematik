// -------------------------------------------------------------------------- //
//                                                                            //
// Adds a chainable method to the specified object.                           //
//                                                                            //
// -------------------------------------------------------------------------- //

// This file is a Schematik-specific ES6 rewrite of:
//   chaijs/chai/lib/chai/utils/addChainableMethod.js

// Check for __proto__ support
const supportsProto = '__proto__' in Object;

// Regex for function prototype methods that cannot be overwritten
const excludeNames  = /^(?:length|name|arguments|caller)$/;

// Default function properties
const call  = Function.prototype.call;
const apply = Function.prototype.apply;


export default function addChainable(context, name, call, get) {

  if (typeof get !== 'function') { get = function() { }; }

  let behavior = {
    call:   call,
    get:    get
  };

  // Save methods for later overwrites
  if (!context.__methods) { context.__methods = { }; }
  context.__methods[name] = behavior;

  // Attach the chainable method to the object
  Object.defineProperty(context, name, {
    configurable: true,
    get: function() {
      // Allow onGet to make changes to the Schematik
      // If changes are made, a new Schematik will be returned
      let self = behavior.get.call(this);
      if (self === undefined) { self = this; }
      if (!self.__schematik) {
        throw new Error('Chainable get() must return a Schematik.');
      }

      // Construct the wrapper function for the onCall
      let wrapper = function wrapper() {
        let result = behavior.call.apply(self, arguments);
        self = self.flag('chain', null);
        return result === undefined ? self : result;
      };

      // Make the wrapper act like Schematik
      if (supportsProto) {
        // Replace function prototype
        let prototype = wrapper.__proto__ = Object.create(self);
        // Restore `call` and `apply` methods
        prototype.call  = call;
        prototype.apply = apply;
      }

      // Otherwise, fallback to redefining properties
      else {
        let propNames = Object.getOwnPropertyNames(context);
        propNames.forEach((name) => {
          if (!excludeNames.test(name)) {
            let descriptor = Object.getOwnPropertyDescriptor(context, name);
            Object.defineProperty(wrapper, name, descriptor);
          }
        });
      }

      wrapper.__flags  = self.__flags;
      wrapper.__schema = self.__schema;
      return wrapper;
    }
  });

}
