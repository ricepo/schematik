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
   * @param         {flag} boolean indicating whether to use dev mode.
   * @returns       {this} for further chaining.
   */
  Schematik.dev = function(flag = true) {
    Config.devMode = flag;
    return this;
  };

}
