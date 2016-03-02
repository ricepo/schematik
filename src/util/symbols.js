/**
 * Schematik symbols
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */
const devMode      = require('../config').devMode;


/*!
 * Fallback when symbols are not supported, or
 * when there is need to expose special properties.
 */
let _symbol = Symbol;
/* istanbul ignore if else */
if (!_symbol || devMode) {
  _symbol = function(name) { return `@@${name}`; };
}


/*!
 * Symbol for middleware list property.
 */
exports.mwares  = _symbol('mwares');


/*!
 * Symbol for chaining behaviors property.
 */
exports.methods = _symbol('methods');


/*!
 * Symbol for behavior flags property.
 */
exports.flags   = _symbol('flags');


/*!
 * Symbol for internal schema property.
 */
exports.schema  = _symbol('schema');
