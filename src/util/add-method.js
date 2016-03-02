/**
 * Schematik.util.addMethod
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 *
 * This file is a Schematik-specific ES6 rewrite of:
 * chaijs/chai/lib/chai/utils/addMethod.js
 */
const IsSchematik  = require('./is-schematik');


function addMethod(context, name, fn) {

  context[name] = function() {
    let result = fn.apply(this, arguments);
    if (result === undefined) { result = this; }
    if (IsSchematik(result)) { result = result.flag('chain', null); }
    return result;
  };

}
module.exports = addMethod;
