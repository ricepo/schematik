/**
 * Schematik symbols
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */

import { devMode }  from '../config';


/*!
 * Fallback when symbols are not supported, or
 * when there is need to expose special properties.
 */
var _symbol = Symbol;
if (!_symbol || devMode) {
  _symbol = function(name) { return `__${name}`; };
}


/*!
 * Symbol for middleware list property.
 */
export const mwares  = _symbol('mwares');


/*!
 * Symbol for chaining behaviors property.
 */
export const methods = _symbol('methods');


/*!
 * Symbol for behavior flags property.
 */
export const flags   = _symbol('flags');


/*!
 * Symbol for internal schema property.
 */
export const schema  = _symbol('schema');
