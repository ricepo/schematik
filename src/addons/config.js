/**
 * Exposes Schematik config.
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */

import * as Config  from '../config';

export default function(Schematik, Util) {

  /**
   * .dev()
   *
   * @desc          Enables Schematik development mode.
   */
  Schematik.dev = function() {
    Config.devMode = true;
    return this;
  };

}
