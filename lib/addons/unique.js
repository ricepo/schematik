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
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.unique = unique;

function unique() {
  return this.self().flag('unique', true);
}

/**
 * Export a middleware function.
 */

exports['default'] = function (context, util) {

  util.addProperty(context, 'unique', unique);
};
//# sourceMappingURL=../addons/unique.js.map