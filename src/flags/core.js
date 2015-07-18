/**
 * Schematik core flags to be attached to the Schematik prototype.
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */


/**
* Schematik.prototype.required
*
* @desc Returns a copy of the Schematik with `required` flag set to true.
*/
export function required() {
 return this.self().flag('required', true);
}

/**
 * Schematik.prototype.optional
 *
 * @desc Returns a copy of the Schematik with `required` flag set to false.
 */
export function optional() {
 return this.self().flag('required', false);
}

/**
 * Schematik.prototype.not / no
 *
 * @desc Sets the `negate` flag to true.
 */
export function negate() {
  return this.flag('negate', true);
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

}
