/**
 * Schematik.Integer
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */

import { SkNumber } from './number';

/**
 * Schematik.Integer
 *
 * @classdesc       Schematik integer type representation.
 */
export class SkInteger extends SkNumber {

  constructor() {
    super();
    this.__type('integer', true);
  }

}

/*!
 * Export a middleware function.
 */
export default function(Schematik, Util) {

  /*!
   * Expose SkInteger as Schematik.Integer
   */
  Schematik.Integer = SkInteger;

  /*!
   * Attach the Schematik.integer() shorthand.
   */
  Schematik.integer = Schematik.prototype.integer = function() {
    let result = new Schematik.Integer();
    this.self().copyTo(result);
    result.__type('integer');
    return result;
  };

}
