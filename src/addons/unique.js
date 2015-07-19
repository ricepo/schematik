/**
 * `unique` flag
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */


/**
* # .unique
*
* @desc          Restricts the array to only include unique elements.
* @returns       A copy of Schematik with `unique` flag set to {true}
*/
export function unique() {
 return this.self().flag('unique', true);
}


/**
 * Export a middleware function.
 */
export default function(context, util) {

  util.addProperty(context, 'unique', unique);

}
