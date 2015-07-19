/**
 * Schematik core flags to be attached to the Schematik prototype.
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */

import { conjunctions } from '../config';

/**
* .required
*
* @desc             Returns a copy of the Schematik with `required` flag set
*                   to true.
*/
export function required() {
 return this.self().flag('required', true);
}

/**
 * .optional
 *
 * @desc            Returns a copy of the Schematik with `required` flag set
 *                  to false.
 */
export function optional() {
 return this.self().flag('required', false);
}

/**
 * .negate
 *
 * @desc            Sets the `negate` flag to true.
 */
export function negate() {
  return this.flag('negate', true);
}


/**
 * .of()
 *
 * @desc            Calls the last uninvoked function, passing it all arguments.
 */
export function of(...args) {
  let chain = this.flag('chain');
  if (chain) { return chain.apply(this, args); }
  return this;
}

/**
 * Export a middleware function.
 */
export default function core(Schematik, Util) {

  Util.addProperty(Schematik,           'required', required);
  Util.addProperty(Schematik.prototype, 'required', required);

  Util.addProperty(Schematik,           'optional', optional);
  Util.addProperty(Schematik.prototype, 'optional', optional);

  Util.addProperty(Schematik.prototype, 'not', negate);
  Util.addProperty(Schematik.prototype, 'no',  negate);

  Util.addChainable(Schematik.prototype, 'of', of);

  for (let item of conjunctions) {
    Util.addProperty(Schematik.prototype, item);
  }

}
