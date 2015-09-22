// -------------------------------------------------------------------------- //
//                                                                            //
// Adds a property to the specified object.                                   //
//                                                                            //
// -------------------------------------------------------------------------- //

// This file is a Schematik-specific ES6 rewrite of:
//   chaijs/chai/lib/chai/utils/addProperty.js

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = addProperty;

function addProperty(context, name, getter) {
  if (typeof getter !== 'function') {
    getter = function () {};
  }
  Object.defineProperty(context, name, {
    get: function get() {
      var result = getter.call(this);
      return result === undefined ? this : result;
    }
  });
}

module.exports = exports['default'];
//# sourceMappingURL=../util/add-property.js.map