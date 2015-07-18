/**
 * Schematik flags that serve as sugar with no real purpose.
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */

import { conjunctions } from '../config';


/*!
 * Export a middleware function.
 */
export default function(Schematik, Util) {

  /*!
   * Attach all conjunctions to the context
   */
  for (let item of conjunctions) {
    Util.addProperty(Schematik.prototype, item);
  }

}
