/**
 * Schematik.Integer
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
// istanbul ignore next

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

// istanbul ignore next

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _number = require('./number');

var _utilInstantiate = require('../util/instantiate');

var _utilInstantiate2 = _interopRequireDefault(_utilInstantiate);

/**
 * Schematik.Integer
 *
 * @classdesc       Schematik integer type representation.
 */

var SkInteger = (function (_SkNumber) {
  _inherits(SkInteger, _SkNumber);

  function SkInteger() {
    _classCallCheck(this, SkInteger);

    _get(Object.getPrototypeOf(SkInteger.prototype), 'constructor', this).call(this);
    this.__type('integer', true);
  }

  /*!
   * Export a middleware function.
   */
  return SkInteger;
})(_number.SkNumber);

exports.SkInteger = SkInteger;

exports['default'] = function (Schematik) {

  /*!
   * Expose SkInteger as Schematik.Integer
   */
  Schematik.Integer = SkInteger;

  /*!
   * Attach the Schematik.integer() shorthand.
   */
  Schematik.integer = Schematik.prototype.integer = function () {
    return (0, _utilInstantiate2['default'])(this.self(), Schematik.Integer);
  };
};
//# sourceMappingURL=../types/integer.js.map