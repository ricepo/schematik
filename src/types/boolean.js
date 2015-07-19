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
export default function(Schematik, Util) {

  /*!
   * Expose SkBoolean as Schematik.Boolean
   */
  Schematik.Boolean = SkBoolean;

  /*!
   * Attach the Schematik.boolean() shorthand.
   */
  Schematik.boolean = Schematik.prototype.boolean = function() {
    return instantiate(this.self(), Schematik.Boolean);
  };

}
