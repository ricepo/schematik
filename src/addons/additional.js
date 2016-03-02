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
function additional() {
  return this.flag('additional', true);
}


/**
 * Export a middleware function.
 */
module.exports = function(context, util) {
  util.addProperty(context, 'more',       additional);
  util.addProperty(context, 'additional', additional);
};
module.exports.additional = additional;
