/**
 * Schematik.util.addChainable
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */

// This file is a Schematik-specific ES6 rewrite of:
//   chaijs/chai/lib/chai/utils/addChainableMethod.js

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = addChainable;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _symbols = require('./symbols');

var _symbols2 = _interopRequireDefault(_symbols);

var _isSchematik = require('./is-schematik');

var _isSchematik2 = _interopRequireDefault(_isSchematik);

var apply = Function.prototype.apply;

// Adds a chainable method to the specified object

function addChainable(context, name, call, get) {
  if (typeof get !== 'function') {
    get = function () {};
  }

  var behavior = { call: call, get: get };

  // Save methods for later overwrites
  if (!context[_symbols2['default']]) {
    context[_symbols2['default']] = {};
  }
  context[_symbols2['default']][name] = behavior;

  // Attach the chainable method to the object
  Object.defineProperty(context, name, {
    configurable: true,
    get: function get() {
      // Allow onGet to make changes to the Schematik
      // If changes are made, a new Schematik will be returned
      var self = behavior.get.call(this);
      if (self === undefined) {
        self = this;
      }
      if (!(0, _isSchematik2['default'])(self)) {
        throw new Error('get() must return a Schematik object or undefined.');
      }

      // Construct the wrapper function for the onCall
      var wrapper = function wrapper() {
        var result = behavior.call.apply(self, arguments);
        self = self.flag('chain', null);
        return result === undefined ? self : result;
      };

      // Make the wrapper act like Schematik
      var prototype = Object.create(self);
      Object.setPrototypeOf(wrapper, prototype);
      prototype.call = call;
      prototype.apply = apply;

      self.flag('chain', wrapper).copyTo(wrapper);
      return wrapper;
    }
  });
}

module.exports = exports['default'];
//# sourceMappingURL=../util/add-chainable.js.map