/**
 * Schematik.Integer
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */

const SkNumber    = require('./number').SkNumber;
const instantiate = require('../util/instantiate');


/**
 * Schematik.Integer
 *
 * @classdesc       Schematik integer type representation.
 */
export class SkInteger extends SkNumber {

  constructor(raw) {
    super(raw);
    this.__type('integer', true);
  }

}

/*!
 * Export a middleware function.
 */
module.exports = function(Schematik) {

  /*!
   * Expose SkInteger as Schematik.Integer
   */
  Schematik.Integer = SkInteger;

  /*!
   * Attach the Schematik.integer() shorthand.
   */
  Schematik.integer = Schematik.prototype.integer = function(...args) {
    return instantiate(this.self(), Schematik.Integer, ...args);
  };

};
module.exports.SkInteger = SkInteger;
