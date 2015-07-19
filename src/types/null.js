/**
 * Schematik.Null
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */

import Schematik    from '../schematik';
import instantiate  from '../util/instantiate';


/**
 * Schematik.Null
 *
 * @classdesc       Schematik null type representation.
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
   * Expose SkNull as Schematik.Null
   */
  Schematik.Null = SkNull;

  /*!
   * Attach the Schematik.null() shorthand.
   */
  Schematik.null = Schematik.prototype.null = function() {
    return instantiate(this.self(), Schematik.Null);
  };

}
