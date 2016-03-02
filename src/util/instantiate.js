/**
 * Schematik.util.instantiate
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */
const Symbols      = require('./symbols');


/**
 * .instantiate()
 *
 * @access          public
 * @desc            Instantiates the Schematik using the specified constructor
 *                  while merging flags and schema. Type property of the schema
 *                  is ignored in this process.
 * @param           {self} current Schematik instance.
 * @param           {ctor} constructor function to use.
 * @param           {args} additional parameters to pass to the constructor.
 * @returns         A new Schematik instance made using the {ctor}.
 */
function instantiate(self, ctor, ...args) {
  const result = new ctor(...args);
  result[Symbols.flags] = result[Symbols.flags].merge(self[Symbols.flags]);
  result[Symbols.schema] = result[Symbols.schema].merge(
    self[Symbols.schema].without('type')
  );
  return result;
}
module.exports = instantiate;
