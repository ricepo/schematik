/**
 * Schematik.Boolean
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */

import Schematik    from '../schematik';
import instantiate  from '../util/instantiate';


/**
 * Schematik.Boolean
 *
 * @classdesc       Schematik boolean type representation.
 */
export class SkBoolean extends Schematik {

  constructor() {
    super();
    this.__type('boolean');
  }

}


/*!
 * Export a middleware function.
 */
export default function(schematik) {

  /*!
   * Expose SkBoolean as Schematik.Boolean
   */
  schematik.Boolean = SkBoolean;

  /*!
   * Attach the Schematik.boolean() shorthand.
   */
  schematik.boolean = schematik.prototype.boolean = function() {
    return instantiate(this.self(), schematik.Boolean);
  };

}
