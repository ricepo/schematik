/**
 * Schematik.Null
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */

import Schematik    from '../schematik';


/**
 * Schematik.Boolean
 *
 * @classdesc       Schematik boolean type representation.
 */
export class SkNull extends Schematik {

  constructor() {
    super();
    this.__type('null');
  }

}


/*!
 * Export a middleware function.
 */
export default function(Schematik, Util) {

  /*!
   * Expose SkBoolean as Schematik.Boolean
   */
  Schematik.Null = SkNull;

  /*!
   * Attach the Schematik.boolean() shorthand.
   */
  Schematik.null = Schematik.prototype.null = function() {
    let result = new Schematik.Null();
    this.self().copyTo(result);
    result.__type('null');
    return result;
  };

}
