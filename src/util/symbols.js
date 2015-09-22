/**
 * Schematik symbols
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */

import Debug        from 'debug';
import { devMode }  from '../config';

const print = Debug('schematik:symbols');

/*!
 * Fallback when symbols are not supported, or
 * when there is need to expose special properties.
 */
let _symbol = Symbol;
/* istanbul ignore if else */
if (!_symbol || devMode) {
  print('Symbols disabled, using fallback strings.');
  _symbol = function(name) { return `@@${name}`; };
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
