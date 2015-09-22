/**
 * Schematik.String
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

var _addonsRange = require('../addons/range');

var _addonsRange2 = _interopRequireDefault(_addonsRange);

var _utilInstantiate = require('../util/instantiate');

var _utilInstantiate2 = _interopRequireDefault(_utilInstantiate);

/**
 * Schematik.String
 *
 * @classdesc       Schematik string type representation.
 */

var SkString = (function (_Schematik) {
  _inherits(SkString, _Schematik);

  function SkString() {
    _classCallCheck(this, SkString);

    _get(Object.getPrototypeOf(SkString.prototype), 'constructor', this).call(this);
    this.__type('string');
  }

  /*!
   * Export a middleware function.
   */

  /**
   * .length()
   *
   * @access        public
   * @desc          Sets the minimum and/or maximum allowed length.
   *                Behavior depends on `range` flag.
   * @param         {a} the first length value.
   * @param         {b} the second length value.
   * @returns       A copy of the Schematik with the length values set.
   */

  _createClass(SkString, null, [{
    key: '__length',
    value: function __length(a, b) {
      if (typeof a !== 'number') {
        throw new Error('Length value must be a number.');
      }

      var diff = {};
      if (this.flag('range') === 'min') {
        diff.minLength = a;
      } else if (this.flag('range') === 'max') {
        diff.maxLength = a;
      } else if (typeof b === 'number') {
        diff.minLength = a;
        diff.maxLength = b;
      } else {
        diff.minLength = diff.maxLength = a;
      }

      return this.schema(diff).flag('range', null);
    }

    /**
     * .matches()
     *
     * @access        public
     * @desc          Restricts the SkString to ones that match the regex.
     * @param         {pattern} an intance of RegExp
     * @returns       A copy of the Schematik with the pattern set.
     */
  }, {
    key: '__matches',
    value: function __matches(pattern) {
      if (!(pattern instanceof RegExp)) {
        throw new Error('Pattern must be an instance of RegExp.');
      }

      return this.schema({ pattern: pattern.source });
    }
  }]);

  return SkString;
})(_schematik2['default']);

exports.SkString = SkString;

exports['default'] = function (Schematik, Util) {

  /*!
   * Expose SkString as Schematik.String
   */
  Schematik.String = SkString;

  /*!
   * Attach the Schematik.string() shorthand.
   */
  Schematik.string = Schematik.prototype.string = function () {
    return (0, _utilInstantiate2['default'])(this.self(), Schematik.String);
  };

  /*!
   * Attach shared flags.
   */
  (0, _addonsRange2['default'])(Schematik.String.prototype, Util);

  /*!
   * Attach string-specific properties.
   */
  var proto = Schematik.String.prototype;
  Util.addChainable(proto, 'len', SkString.__length);
  Util.addChainable(proto, 'length', SkString.__length);
  Util.addChainable(proto, 'matches', SkString.__matches);
  Util.addChainable(proto, 'pattern', SkString.__matches);
};
//# sourceMappingURL=../types/string.js.map