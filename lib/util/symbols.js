/**
 * Schematik symbols
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _config = require('../config');

/*!
 * Fallback when symbols are not supported, or
 * when there is need to expose special properties.
 */
var _symbol = Symbol;
/* istanbul ignore if else */
if (!_symbol || _config.devMode) {
  _symbol = function (name) {
    return '@@' + name;
  };
}

/*!
 * Symbol for middleware list property.
 */
var mwares = _symbol('mwares');

exports.mwares = mwares;
/*!
 * Symbol for chaining behaviors property.
 */
var methods = _symbol('methods');

exports.methods = methods;
/*!
 * Symbol for behavior flags property.
 */
var flags = _symbol('flags');

exports.flags = flags;
/*!
 * Symbol for internal schema property.
 */
var schema = _symbol('schema');
exports.schema = schema;
//# sourceMappingURL=../util/symbols.js.map