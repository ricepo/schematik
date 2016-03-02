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
function unique() {
  return this.self().schema({ uniqueItems: true });
}


/**
 * Export a middleware function.
 */
module.exports = function(context, util) {

  util.addProperty(context, 'unique', unique);

};
module.exports.unique = unique;
