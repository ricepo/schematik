// -------------------------------------------------------------------------- //
//                                                                            //
// Checks whether an object is a Schematik.                                   //
//                                                                            //
// -------------------------------------------------------------------------- //
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = isSchematik;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _schematik = require('../schematik');

var _schematik2 = _interopRequireDefault(_schematik);

function isSchematik(object) {
  return object instanceof _schematik2['default'];
}

module.exports = exports['default'];
//# sourceMappingURL=../util/is-schematik.js.map