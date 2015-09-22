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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _schematik = require('./schematik');

var _schematik2 = _interopRequireDefault(_schematik);

var _config = require('./config');

var Config = _interopRequireWildcard(_config);

var _util = require('./util');

var Util = _interopRequireWildcard(_util);

var _addonsCore = require('./addons/core');

var _addonsCore2 = _interopRequireDefault(_addonsCore);

var _addonsUnique = require('./addons/unique');

var _addonsUnique2 = _interopRequireDefault(_addonsUnique);

var _typesArray = require('./types/array');

var _typesArray2 = _interopRequireDefault(_typesArray);

var _typesBoolean = require('./types/boolean');

var _typesBoolean2 = _interopRequireDefault(_typesBoolean);

var _typesInteger = require('./types/integer');

var _typesInteger2 = _interopRequireDefault(_typesInteger);

var _typesNull = require('./types/null');

var _typesNull2 = _interopRequireDefault(_typesNull);

var _typesNumber = require('./types/number');

var _typesNumber2 = _interopRequireDefault(_typesNumber);

var _typesObject = require('./types/object');

var _typesObject2 = _interopRequireDefault(_typesObject);

var _typesString = require('./types/string');

var _typesString2 = _interopRequireDefault(_typesString);

exports['default'] = _schematik2['default'];

/*!
 * Enable source map support if `source-map-support` is installed
 */
var sourcemaps = require.resolve('source-map-support');
/* istanbul ignore else */
if (sourcemaps) {
  require(sourcemaps).install();
}

/*!
 * Load the module version from package.json
 */
_schematik2['default'].version = require('../package.json').version;

/*!
 * Use a set to track middleware
 */
var middleware = new Set();

/**
 * .use()
 *
 * @access          public
 * @desc            Extends the Schematik using the middleware.
 * @param           {fn} the middleware function.
 * @returns         {Schematik} class constructor for chaining.
 */
_schematik2['default'].use = function (fn) {
  if (!middleware.has(fn)) {
    fn(this, Util);
    middleware.add(fn);
  }
  return this;
};

/*!
 * Expose Schematik utilities via Schematik.util
 */
_schematik2['default'].config = Config;
_schematik2['default'].util = Util;

/*!
 * Attach global flags to the Schematik.
 */
_schematik2['default'].use(_addonsCore2['default']);
_schematik2['default'].use(_addonsUnique2['default']);

/*!
 * Attach builtin Schematik types.
 */
_schematik2['default'].use(_typesArray2['default']);
_schematik2['default'].use(_typesBoolean2['default']);
_schematik2['default'].use(_typesInteger2['default']);
_schematik2['default'].use(_typesNull2['default']);
_schematik2['default'].use(_typesNumber2['default']);
_schematik2['default'].use(_typesObject2['default']);
_schematik2['default'].use(_typesString2['default']);
module.exports = exports['default'];
//# sourceMappingURL=index.js.map