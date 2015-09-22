/**
 * Schematik.util.arrayConcat
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = arrayConcat;

function arrayConcat(base) {
  // istanbul ignore next

  var _base;

  if (base === undefined) {
    base = [];
  }
  if (!Array.isArray(base)) {
    base = [base];
  }

  for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }

  base = (_base = base).concat.apply(_base, values);

  return base;
}

module.exports = exports["default"];
//# sourceMappingURL=../util/array-concat.js.map