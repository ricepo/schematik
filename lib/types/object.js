/**
 * Schematik.Object
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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// istanbul ignore next

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

// istanbul ignore next

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _schematik = require('../schematik');

var _schematik2 = _interopRequireDefault(_schematik);

var _addonsRange = require('../addons/range');

var _addonsRange2 = _interopRequireDefault(_addonsRange);

var _addonsAdditional = require('../addons/additional');

var _addonsAdditional2 = _interopRequireDefault(_addonsAdditional);

var _config = require('../config');

var Config = _interopRequireWildcard(_config);

var _util = require('../util');

var _utilSymbols = require('../util/symbols');

var _utilInstantiate = require('../util/instantiate');

var _utilInstantiate2 = _interopRequireDefault(_utilInstantiate);

/**
 * Schematik.Object
 *
 * @classdesc       Schematik object type representation.
 */

var SkObject = (function (_Schematik) {
  _inherits(SkObject, _Schematik);

  function SkObject() {
    _classCallCheck(this, SkObject);

    _get(Object.getPrototypeOf(SkObject.prototype), 'constructor', this).call(this);
    this.__type('object');
    this[_utilSymbols.schema] = this[_utilSymbols.schema].merge({ additionalProperties: Config.allowAdditionalProperties });
  }

  /*!
   * Export a middleware function.
   */

  /**
   * .pattern
   *
   * @access        public
   * @desc          Sets the `pattern` flag to true.
   * @returns       A copy of the Schematik with the `pattern` flag set.
   */

  _createClass(SkObject, null, [{
    key: '__pattern',
    value: function __pattern() {
      return this.flag('pattern', true);
    }

    /**
     * .count()
     *
     * @access        public
     * @desc          Sets the property count of the object. Behavior of this
     *                function depends on the `range` flag and number of args.
     * @param         {a} the first property count value.
     * @param         {b} the second property count value.
     * @returns       A copy of the Schematik with the property count set.
     */
  }, {
    key: '__count',
    value: function __count(a, b) {
      if (typeof a !== 'number') {
        throw new Error('Count value must be a number.');
      }

      var diff = {};
      if (this.flag('range') === 'min') {
        var max = this.schema('maxProperties');
        if (max !== undefined && max < a) {
          throw new Error('{min} cannot be greater than {max}');
        }
        diff.minProperties = a;
      } else if (this.flag('range') === 'max') {
        var min = this.schema('minProperties');
        if (min !== undefined && min > a) {
          throw new Error('{max} cannot be less than {min}');
        }
        diff.maxProperties = a;
      } else if (typeof b === 'number') {
        if (b < a) {
          throw new Error('{min} cannot be greater than {max}');
        }
        diff.minProperties = a;
        diff.maxProperties = b;
      } else {
        diff.minProperties = diff.maxProperties = a;
      }

      return this.schema(diff).flag('range', null);
    }

    /**
     * .property()
     *
     * @access        public
     * @desc          Adds a property along with its schema.
     * @param         {key} name of the property.
     * @param         {schema} schema for the property value.
     * @returns       A copy of the Schematik with the property added.
     */
  }, {
    key: '__property',
    value: function __property(key, schema) {
      var overwrite = Config.allowPropertyOverwrite;
      var additional = Config.allowAdditionalProperties;

      // additionalProperties mode
      if (this.flag('additional')) {
        var _current = this.schema('additionalProperties');
        if (!overwrite && _current !== additional && additional !== undefined) {
          throw new Error('Cannot overwrite additional properties.');
        }

        // Apply the `negate` flag if there are no arguments
        if (arguments.length === 0) {
          return this.schema({ additionalProperties: !this.flag('negate') }).flag('additional', false).flag('pattern', false).flag('negate', false);
        }

        var value = arguments[0];
        if (typeof value !== 'boolean' && typeof value !== 'object') {
          throw new Error('Additional property must be a boolean or an object.');
        }

        schema = (0, _util.isSchematik)(value) ? value.done() : value;
        return this.schema({ additionalProperties: schema }).flag('additional', false).flag('pattern', false).flag('negate', false);
      }

      // Check that schema is valid
      if (typeof schema !== 'object') {
        throw new Error('Schema must be an object.');
      }
      var required = false;
      if ((0, _util.isSchematik)(schema)) {
        required = schema.flag('required');
        schema = schema.done();
      }

      // patternProperties mode
      if (this.flag('pattern')) {
        if (!(key instanceof RegExp)) {
          throw new Error('Key must be a RegExp.');
        }
        var _current2 = this.schema('patternProperties');
        if (!overwrite && _current2 && _current2[key.source]) {
          throw new Error('Cannot overwrite pattern property: ' + key.source);
        }

        var _diff = { patternProperties: _defineProperty({}, key.source, schema) };
        return this.flag('pattern', false).schema(_diff, true);
      }

      // properties mode
      if (typeof key !== 'string') {
        throw new Error('Key must be a string.');
      }
      var current = this.schema('properties');
      if (!overwrite && current && current[key]) {
        throw new Error('Cannot overwrite property: ' + key);
      }

      var diff = { properties: _defineProperty({}, key, schema) };
      var creq = this.schema('required');
      if (required) {
        diff.required = (0, _util.arrayConcat)(creq, key);
      }
      return this.schema(diff, true);
    }

    /**
     * .properties()
     *
     * @access        public
     * @desc          Adds multiple properties along with their schemas.
     * @param         {value} a hash of property names to their schemas.
     * @returns       A copy of the Schematik with the properties added.
     */
  }, {
    key: '__properties',
    value: function __properties(value) {

      // If there is an `additional` flag, value must be undefined
      if (this.flag('additional')) {
        if (value !== undefined) {
          throw new Error('Value not supported with `additional` flag.');
        }
        return this.additional.property();
      }

      if (typeof value !== 'object') {
        throw new Error('Value must be an object.');
      }

      var pattern = this.flag('pattern') || false;
      return Object.keys(value).reduce(function (schema, key) {
        var s = value[key];
        if (pattern) {
          key = new RegExp(key);
        }
        return schema.flag('pattern', pattern).property(key, s);
      }, this);
    }
  }]);

  return SkObject;
})(_schematik2['default']);

exports.SkObject = SkObject;

exports['default'] = function (Schematik, Util) {

  /*!
   * Expose SkObject as Schematik.Object
   */
  Schematik.Object = SkObject;

  /*!
   * Attach the Schematik.object() shorthand.
   */
  Schematik.object = Schematik.prototype.object = function () {
    return (0, _utilInstantiate2['default'])(this.self(), Schematik.Object);
  };

  /*!
   * Attach shared flags.
   */
  (0, _addonsRange2['default'])(Schematik.Object.prototype, Util);
  (0, _addonsAdditional2['default'])(Schematik.Object.prototype, Util);

  /*!
   * Attach object-specific properties.
   */
  var proto = Schematik.Object.prototype;
  Util.addProperty(proto, 'pattern', SkObject.__pattern);
  Util.addChainable(proto, 'count', SkObject.__count);
  Util.addChainable(proto, 'property', SkObject.__property);
  Util.addChainable(proto, 'properties', SkObject.__properties);
};
//# sourceMappingURL=../types/object.js.map