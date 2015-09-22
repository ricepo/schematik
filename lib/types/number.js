/**
 * Schematik.Number
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
// istanbul ignore next

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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
 * Schematik.Number
 *
 * @classdesc       Schematik numbner type representation.
 */

var SkNumber = (function (_Schematik) {
  _inherits(SkNumber, _Schematik);

  function SkNumber() {
    _classCallCheck(this, SkNumber);

    _get(Object.getPrototypeOf(SkNumber.prototype), 'constructor', this).call(this);
    this.__type('number');
  }

  /*!
   * Export a middleware function.
   */

  /**
   * .exclusive
   *
   * @access          public
   * @desc            Sets the `exclusive` flag.
   * @returns         A copy of the Schematik with the `exclusive` flag set.
   */

  _createClass(SkNumber, null, [{
    key: '__exclusive',
    value: function __exclusive() {
      return this.flag('exclusive', true);
    }

    /**
     * .min()
     *
     * @access          public
     * @desc            Specifies the minimum value, inclusive unless `exclusive` is
     *                  set to true.
     * @param           {value} minimum value, must be a number.
     * @returns         A copy of the Schematik with the minimum value set.
     */
  }, {
    key: '__min',
    value: function __min(value) {
      if (typeof value !== 'number') {
        throw new Error('{value} must be a number.');
      }

      var max = this.schema('maximum');
      if (max !== undefined && value > max) {
        throw new Error('{min} cannot be greater than {max}.');
      }

      var diff = { minimum: value };
      if (this.flag('exclusive')) {
        diff.exclusiveMinimum = true;
      }
      return this.schema(diff).flag('exclusive', false);
    }

    /**
     * .max()
     *
     * @access          public
     * @desc            Specifies the maximum value, inclusive unless `exclusive` is
     *                  set to true.
     * @param           {value} maximum value, must be a number.
     * @returns         A copy of the Schematik with the maximum value set.
     */
  }, {
    key: '__max',
    value: function __max(value) {
      if (typeof value !== 'number') {
        throw new Error('{value} must be a number.');
      }

      var min = this.schema('minimum');
      if (min !== undefined && value < min) {
        throw new Error('{max} cannot be less than {min}.');
      }

      var diff = { maximum: value };
      if (this.flag('exclusive')) {
        diff.exclusiveMaximum = true;
      }
      return this.schema(diff).flag('exclusive', false);
    }

    /**
     * .range()
     *
     * @access          public
     * @desc            Specifies both minimum and maximum values. Inclusive unless
     *                  the `exclusive` flag is set to true.
     * @param           {min} the minimum value, must be a number.
     * @param           {max} the maximum value, must be a number.
     * @returns         A copy of the Schematik with both minimum and maximum values
     */
  }, {
    key: '__range',
    value: function __range(min, max) {
      if (typeof min !== 'number' || typeof max !== 'number') {
        throw new Error('Min and max values must be numbers.');
      }
      if (min > max) {
        throw new Error('Min cannot be greater than max.');
      }

      var diff = { minimum: min, maximum: max };
      if (this.flag('exclusive')) {
        diff.exclusiveMinimum = true;
        diff.exclusiveMaximum = true;
      }
      return this.schema(diff).flag('exclusive', false);
    }

    /**
     * .multiple()
     *
     * @access          public
     * @desc            Restricts the number to the multiples of the {value}.
     * @param           {value} the divider value.
     * @returns         A copy of the Schematik with multipleOf value set.
     */
  }, {
    key: '__multiple',
    value: function __multiple(value) {
      if (typeof value !== 'number') {
        throw new Error('{value} must be a number.');
      }

      return this.schema({ multipleOf: value });
    }
  }]);

  return SkNumber;
})(_schematik2['default']);

exports.SkNumber = SkNumber;

exports['default'] = function (schematik, Util) {

  /*!
   * Expose SkNumber as Schematik.Number
   */
  schematik.Number = SkNumber;

  /*!
   * Attach the Schematik.number() shorthand.
   */
  schematik.number = schematik.prototype.number = function () {
    return (0, _utilInstantiate2['default'])(this.self(), schematik.Number);
  };

  /*!
   * Attach number-specific properties.
   */
  var proto = schematik.Number.prototype;
  Util.addProperty(proto, 'exclusive', SkNumber.__exclusive);
  Util.addChainable(proto, 'min', SkNumber.__min);
  Util.addChainable(proto, 'max', SkNumber.__max);
  Util.addChainable(proto, 'range', SkNumber.__range);
  Util.addChainable(proto, 'multiple', SkNumber.__multiple);
};
//# sourceMappingURL=../types/number.js.map