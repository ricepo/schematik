// ------------------------------------------------------------------------- //
//                                                                           //
// Chaining utilities.                                                       //
//                                                                           //
// ------------------------------------------------------------------------- //
_ = require('lodash');

var Chainable = {

  // Registers a chainable function
  func: function (obj, prop, fn, options) {
    options = _.assign({ preserveFlags: true }, options);
    var callback = function () {
      var self = this.self();

      // Wrap original function to clear last chain on call
      var wrappedFn = function () {
        var result = fn.apply(self, arguments);
        result.chain = null;
        // Clear flags if so specified
        if (!options.preserveFlags)
          result.flags = { };
        return result;
      };

      // Make returned function act as a keyword when needed
      wrappedFn.__proto__ = self;
      wrappedFn.chain     = wrappedFn;
      return wrappedFn;
    };
    Chainable.register(obj, prop, callback, options);
  },

  // Registers a chainable modifier
  modifier: function (obj, prop, fn, options) {
    options = _.assign({ flag:  prop }, options);
    var callback = function () {
      if (!fn) {
        // Enable the flag
        this.self().flags[options.flag] = true;
        return this.self();
      } else {
        return fn.apply(this.self());
      }
    };
    Chainable.register(obj, prop, callback, options);
  },

  // Registers a chainable conjunction
  conjunction: function (obj, prop, options) {
    options = _.assign({ }, options);
    var callback = function () { return this.self(); };
    Chainable.register(obj, prop, callback, options);
  },

  // Registers a get callback to a property
  register: function (obj, prop, callback, options) {
    // Default scope is 'instance', unless otherwise specified
    options = _.assign({ scope: 'instance'}, options);
    // Create a descriptor
    var descriptor = {
      enumerable:   false,
      configurable: true,
      get: callback
    };
    // Attach the property to the object instances
    if (options.scope === 'instance' || options.scope === 'all')
      Object.defineProperty(obj.prototype, prop, descriptor);
    // Attach the property to the object itself (static property)
    if (options.scope === 'static' || options.scope === 'all')
      Object.defineProperty(obj, prop, descriptor);
  }

};

module.exports = Chainable;
