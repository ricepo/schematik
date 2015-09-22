/**
 * Schematik.util.addMethod
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */

// This file is a Schematik-specific ES6 rewrite of:
//   chaijs/chai/lib/chai/utils/addMethod.js
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _isSchematik = require('./is-schematik');

var _isSchematik2 = _interopRequireDefault(_isSchematik);

exports['default'] = function (context, name, fn) {

  context[name] = function () {
    var result = fn.apply(this, arguments);
    if (result === undefined) {
      result = this;
    }
    if ((0, _isSchematik2['default'])(result)) {
      result = result.flag('chain', null);
    }
    return result;
  };
};

module.exports = exports['default'];
//# sourceMappingURL=../util/add-method.js.map