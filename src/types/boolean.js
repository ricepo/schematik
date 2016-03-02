/**
 * Schematik.Boolean
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */

const Schematik    = require('../schematik');
const instantiate  = require('../util/instantiate');


/**
 * Schematik.Boolean
 *
 * @classdesc       Schematik boolean type representation.
 */
class SkBoolean extends Schematik {

  constructor() {
    super();
    this.__type('boolean');
  }

}


/*!
 * Export a middleware function.
 */
module.exports = function(schematik) {

  /*!
   * Expose SkBoolean as Schematik.Boolean
   */
  schematik.Boolean = SkBoolean;

  /*!
   * Attach the Schematik.boolean() shorthand.
   */
  schematik.boolean = schematik.prototype.boolean = function(...args) {
    return instantiate(this.self(), schematik.Boolean, ...args);
  };

};
module.exports.SkBoolean = SkBoolean;
