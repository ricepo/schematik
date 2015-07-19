/**
 * Schematik `min` and `max` flags.
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */


/**
 * Schematik.prototype.min
 *
 * @desc Returns the Schematik with `range` flag set to `min`.
 */
export function min() {
  return this.flag('range', 'min');
}

/**
 * Schematik.prototype.max
 *
 * @desc Returns the Schematik with `range` flag set to `max`.
 */
export function max() {
  return this.flag('range', 'max');
}

/**
 * Export a middleware function.
 */
export default function(context, util) {

  util.addProperty(context, 'min',     min);
  util.addProperty(context, 'minimum', min);
  util.addProperty(context, 'max',     max);
  util.addProperty(context, 'maximum', max);

}
