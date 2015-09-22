/**
 * Schematik.util.instantiate
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = instantiate;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _symbols = require('./symbols');

var Symbols = _interopRequireWildcard(_symbols);

/**
 * .instantiate()
 *
 * @access          public
 * @desc            Instantiates the Schematik using the specified constructor
 *                  while merging flags and schema. Type property of the schema
 *                  is ignored in this process.
 * @param           {self} current Schematik instance.
 * @param           {ctor} constructor function to use.
 * @returns         A new Schematik instance made using the {ctor}.
 */

function instantiate(self, ctor) {
  var result = new ctor();
  result[Symbols.flags] = result[Symbols.flags].merge(self[Symbols.flags]);
  result[Symbols.schema] = result[Symbols.schema].merge(self[Symbols.schema].without('type'));
  return result;
}

module.exports = exports['default'];
//# sourceMappingURL=../util/instantiate.js.map