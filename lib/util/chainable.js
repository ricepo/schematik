// ------------------------------------------------------------------------- //
//                                                                           //
// Chaining utilities.                                                       //
//                                                                           //
// ------------------------------------------------------------------------- //
_ = require('lodash');

module.exports = {

  // Registers a chainable function
  register: function (obj, prop, fn, options) {

    options = _.assign({
      preserveFlags: true
    }, options);

    // Attach the function to the object
    Object.defineProperty(obj.prototype, prop, {
      enumerable:   false,
      configurable: true,
      get: function () {
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
      }
    });

  },

  // Registers a flag keyword
  keyword: function (obj, flag, fn, options) {

    Object.defineProperty(obj.prototype, flag, {
      enumerable:   false,
      configurable: true,
      get: function () {
        if (!fn) {
          // Enable the flag
          this.self().flags[flag] = true;
          return this.self();
        } else {
          fn.apply(this.self());
        }
      }
    });

  }

};
