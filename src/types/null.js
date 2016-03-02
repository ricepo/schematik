/**
 * Schematik.Null
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */

const Schematik    = require('../schematik');
const instantiate  = require('../util/instantiate');


/**
 * Schematik.Null
 *
 * @classdesc       Schematik null type representation.
 */
class SkNull extends Schematik {

  constructor() {
    super();
    this.__type('null');
  }

}


/*!
 * Export a middleware function.
 */
module.exports = function(schematik) {

  /*!
   * Expose SkNull as Schematik.Null
   */
  schematik.Null = SkNull;

  /*!
   * Attach the Schematik.null() shorthand.
   */
  schematik.null = schematik.prototype.null = function(...args) {
    return instantiate(this.self(), schematik.Null, ...args);
  };

};
module.exports.SkNull = SkNull;
