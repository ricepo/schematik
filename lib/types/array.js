/**
 * Schematik.Array
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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

// istanbul ignore next

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _schematik = require('../schematik');

var _schematik2 = _interopRequireDefault(_schematik);

var _utilSymbols = require('../util/symbols');

var _utilInstantiate = require('../util/instantiate');

var _utilInstantiate2 = _interopRequireDefault(_utilInstantiate);

var _addonsRange = require('../addons/range');

var _addonsRange2 = _interopRequireDefault(_addonsRange);

var _addonsUnique = require('../addons/unique');

var _addonsUnique2 = _interopRequireDefault(_addonsUnique);

var _addonsAdditional = require('../addons/additional');

var _addonsAdditional2 = _interopRequireDefault(_addonsAdditional);

var _utilArrayConcat = require('../util/array-concat');

var _utilArrayConcat2 = _interopRequireDefault(_utilArrayConcat);

/**
 * Schematik.Array
 *
 * @classdesc       Schematik array type representation.
 */

var SkArray = (function (_Schematik) {
  _inherits(SkArray, _Schematik);

  function SkArray() {
    _classCallCheck(this, SkArray);

    _get(Object.getPrototypeOf(SkArray.prototype), 'constructor', this).call(this);
    this.__type('array');
  }

  /*!
   * Export a middleware function.
   */

  /**
   * .done()
   *
   * @override
   */

  _createClass(SkArray, [{
    key: 'done',
    value: function done() {
      var result = _get(Object.getPrototypeOf(SkArray.prototype), 'done', this).call(this);
      if (this.flag('unique')) {
        result.uniqueItems = true;
      }
      return result;
    }

    /**
     * # .items()
     *
     * @desc            Specifies array item schemas.
     * @returns         A copy of Schematik with item schemas set.
     */
  }], [{
    key: '__items',
    value: function __items() {
      for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
        values[_key] = arguments[_key];
      }

      // If we have the `additional` flag, modify `additionalItems` instead
      if (this.flag('additional')) {
        var value = values[0] === undefined ? true : values[0];
        if (this.flag('negate')) {
          value = false;
        }

        if (typeof value !== 'object' && typeof value !== 'boolean') {
          throw new Error('Schematik.Array.items: value must be object or bool.');
        }

        value = value instanceof _schematik2['default'] ? value.done() : value;
        return this.schema({ additionalItems: value });
      }

      if (arguments.length === 0) {
        throw new Error('Schematik.Array.items: need at least one argument.');
      }

      // Map all items to their final object forms
      values = values.map(function (i) {
        return i instanceof _schematik2['default'] ? i.done() : i;
      });

      // If current schema.items is a single object, wrap it into array
      var current = this[_utilSymbols.schema].items;
      current = _utilArrayConcat2['default'].apply(undefined, [current].concat(_toConsumableArray(values)));
      current = current.length === 1 ? current[0] : current;

      return this.schema({ items: current });
    }

    /**
     * # .length()
     *
     * @desc            Specifies array length.
     * @returns         A copy of Schematik with array lengths set.
     */
  }, {
    key: '__length',
    value: function __length(a, b) {
      if (typeof a !== 'number') {
        throw new Error('Schematik.Array.length: length must be a number.');
      }

      var diff = {};
      if (this.flag('range') === 'max') {
        diff.maxItems = a;
      } else if (this.flag('range') === 'min') {
        diff.minItems = a;
      } else if (typeof b === 'number') {
        diff.minItems = a;
        diff.maxItems = b;
      } else {
        diff.minItems = diff.maxItems = a;
      }

      return this.schema(diff).flag('range', null);
    }
  }]);

  return SkArray;
})(_schematik2['default']);

exports.SkArray = SkArray;

exports['default'] = function (schematik, Util) {

  /*!
   * Expose SkArray class as Schematik.Array
   */
  schematik.Array = SkArray;

  /*!
   * Attach the Schematik.array() shorthand.
   */
  schematik.array = schematik.prototype.array = function () {
    return (0, _utilInstantiate2['default'])(this.self(), schematik.Array);
  };

  var proto = schematik.Array.prototype;

  /*!
   * Attach shared flags
   */
  (0, _addonsRange2['default'])(proto, Util);
  (0, _addonsUnique2['default'])(proto, Util);
  (0, _addonsAdditional2['default'])(proto, Util);

  /*!
   * Attach array-specific methods.
   */
  Util.addChainable(proto, 'items', SkArray.__items);
  Util.addChainable(proto, 'len', SkArray.__length);
  Util.addChainable(proto, 'count', SkArray.__length);
  Util.addChainable(proto, 'length', SkArray.__length);

  /*!
   * Allow
   */
};
//# sourceMappingURL=../types/array.js.map