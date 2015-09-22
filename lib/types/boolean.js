/**
 * Schematik.Boolean
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

var _schematik = require('../schematik');

var _schematik2 = _interopRequireDefault(_schematik);

var _utilInstantiate = require('../util/instantiate');

var _utilInstantiate2 = _interopRequireDefault(_utilInstantiate);

/**
 * Schematik.Boolean
 *
 * @classdesc       Schematik boolean type representation.
 */

var SkBoolean = (function (_Schematik) {
  _inherits(SkBoolean, _Schematik);

  function SkBoolean() {
    _classCallCheck(this, SkBoolean);

    _get(Object.getPrototypeOf(SkBoolean.prototype), 'constructor', this).call(this);
    this.__type('boolean');
  }

  /*!
   * Export a middleware function.
   */
  return SkBoolean;
})(_schematik2['default']);

exports.SkBoolean = SkBoolean;

exports['default'] = function (schematik) {

  /*!
   * Expose SkBoolean as Schematik.Boolean
   */
  schematik.Boolean = SkBoolean;

  /*!
   * Attach the Schematik.boolean() shorthand.
   */
  schematik.boolean = schematik.prototype.boolean = function () {
    return (0, _utilInstantiate2['default'])(this.self(), schematik.Boolean);
  };
};
//# sourceMappingURL=../types/boolean.js.map