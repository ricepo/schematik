/**
 * Schematik `additional` flag.
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */

/**
 * # .additional
 *
 * @desc Sets the `additional` flag to true.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.additional = additional;

function additional() {
  return this.flag('additional', true);
}

/**
 * Export a middleware function.
 */

exports['default'] = function (context, util) {
  util.addProperty(context, 'more', additional);
  util.addProperty(context, 'additional', additional);
};
//# sourceMappingURL=../addons/additional.js.map