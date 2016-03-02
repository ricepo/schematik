/**
 * Schematik.util.addChainable
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 *
 * This file is a Schematik-specific ES6 rewrite of:
 * chaijs/chai/lib/chai/utils/addProperty.js
 */


function addProperty(context, name, getter) {
  if (typeof getter !== 'function') { getter = function() { }; }
  Object.defineProperty(context, name, {
    get() {
      const result = getter.call(this);
      return result === undefined ? this : result;
    }
  });
}
module.exports = addProperty;
