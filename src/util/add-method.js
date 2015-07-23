/**
 * Schematik.util.addMethod
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */

// This file is a Schematik-specific ES6 rewrite of:
//   chaijs/chai/lib/chai/utils/addMethod.js
import isSchematik  from './is-schematik';

export default function(context, name, fn) {

  context[name] = function() {
    let result = fn.apply(this, arguments);
    if (result === undefined) { result = this; }
    if (isSchematik(result)) { result = result.flag('chain', null); }
    return result;
  };

}
