/**
 * Schematik
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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// istanbul ignore next

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _seamlessImmutable = require('seamless-immutable');

var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);

var _config = require('./config');

var Config = _interopRequireWildcard(_config);

var _utilSymbols = require('./util/symbols');

var Symbols = _interopRequireWildcard(_utilSymbols);

var _utilIsSchematik = require('./util/is-schematik');

var _utilIsSchematik2 = _interopRequireDefault(_utilIsSchematik);

/**
 * Schematik
 *
 * @classdesc Base class for all Schematiks.
 */

var Schematik = (function () {
  function Schematik() {
    _classCallCheck(this, Schematik);

    // Immutable object for storing flags and schema state
    this[Symbols.flags] = (0, _seamlessImmutable2['default'])(Config.defaultFlags);
    this[Symbols.schema] = (0, _seamlessImmutable2['default'])({});
  }

  /**
   * # .done()
   *
   * @access        public
   * @desc          Converts the Schematik into an actual JSON schema object.
   * @returns       A JSON schema object.
   */

  _createClass(Schematik, [{
    key: 'done',
    value: function done() {
      return this[Symbols.schema].asMutable({ deep: true });
    }

    /**
     * # .self()
     *
     * @access        public
     * @desc          Used for certain properties that can be defined on both
     *                prototype and the class itself (static).
     * @returns       {this}
     */
  }, {
    key: 'self',
    value: function self() {
      return this;
    }

    /**
     * # .self()
     *
     * @access        public
     * @desc          Static version of .self(), serves the same purpose.
     * @returns       new Schematik object.
     */
  }, {
    key: 'clone',

    /**
     * # .clone()
     *
     * @access        public
     * @desc          Creates a copy of the Schematik object.
     * @returns       A copy of the Schematik object.
     */
    value: function clone() {
      var copy = Object.create(this);
      this.copyTo(copy);
      return copy;
    }

    /**
     * # .flag(key, value)
     *
     * @access        public
     * @desc          Gets or sets the value of a flag.
     * @param         {key} name of the flag.
     * @param         {value} new value for the flag, if any.
     * @returns       Flag value when {value} is {undefined};
     *                otherwise a new copy of the Schematik object with the
     *                specified flag set to the {value}.
     */
  }, {
    key: 'flag',
    value: function flag(key, value) {

      if (typeof value === 'undefined') {
        return this[Symbols.flags][key];
      }

      var result = this.clone();
      result[Symbols.flags] = this[Symbols.flags].merge(_defineProperty({}, key, value));
      return result;
    }

    /**
     * # .schema(value)
     *
     * @access        public
     * @desc          Gets or sets the schema of a flag.
     * @param         {value} schema property path; or a partial schema to merge.
     * @param         {deep} specifies whether to perform a deep merge.
     * @returns       Value of the property path if {value} is a {string};
     *                otherwise a new copy of the Schematik object with the
     *                {value} merged into the schema.
     */
  }, {
    key: 'schema',
    value: function schema(value) {
      var deep = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      if (typeof value === 'string') {
        return this[Symbols.schema][value];
      }

      if (typeof value === 'object') {
        var result = this.clone();
        result[Symbols.schema] = this[Symbols.schema].merge(value, { deep: deep });
        return result;
      }

      throw new Error('Value must be a string or an object.');
    }

    /**
     * # .clone()
     *
     * @access        public
     * @desc          Copies flags and schema to another Schematik object.
     * @param         {this} another Schematik object.
     * @returns       {this} for chaining.
     */
  }, {
    key: 'copyTo',
    value: function copyTo(that) {
      if (!(0, _utilIsSchematik2['default'])(that)) {
        throw new Error('Cannot copy to a non-Schematik object.');
      }
      that[Symbols.flags] = this[Symbols.flags];
      that[Symbols.schema] = this[Symbols.schema];
      return this;
    }

    /**
     * # .toString()
     *
     * @override
     * @access        public
     * @desc          Provides a custom string representation of the Schematik.
     * @returns       '[object Schematik]'
     */
  }, {
    key: 'toString',
    value: function toString() {
      return '[object Schematik]';
    }

    /**
     * # .__type(value)
     *
     * @access        protected
     * @desc          Sets the type of the Schematik object.
     * @param         {value} name of the type, must be a string.
     * @returns       {this} for chaining.
     */
  }, {
    key: '__type',
    value: function __type(value, force) {

      if (typeof value === 'undefined') {
        return this[Symbols.schema].type;
      }

      if (!Config.whitelistedTypes.has(value)) {
        throw new Error('Invalid type value ' + value);
      }

      if (!force && !Config.allowTypeOverwrite && this[Symbols.schema].type) {
        throw new Error('Overwriting existing type is not allowed.');
      }

      this[Symbols.schema] = this[Symbols.schema].merge({ type: value });
      return this;
    }
  }], [{
    key: 'self',
    value: function self() {
      return new Schematik();
    }
  }]);

  return Schematik;
})();

exports['default'] = Schematik;
module.exports = exports['default'];
//# sourceMappingURL=schematik.js.map