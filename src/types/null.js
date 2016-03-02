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
export default function(schematik) {

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

}
