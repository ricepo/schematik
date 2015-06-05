// ------------------------------------------------------------------------- //
//                                                                           //
// Miscellaneous utilities for manipulating Schematiks.                      //
//                                                                           //
// ------------------------------------------------------------------------- //
_         = require('lodash');
Schematik = require('../types/base');

// Self-reference. Returns a new Schematik instance when called on constructor.
Schematik.self = function() { return new Schematik(); };

// Register a type
Schematik.register = function(name, constructor) {
  Schematik[name] = Schematik.prototype[name] = function() {
    return new constructor(this.self());
  };
};

// ------------------------------------------------------------------------- //
// Utility namespace for schematik.                                          //
// ------------------------------------------------------------------------- //
Schematik.util = { };

// If the value is a Schematik instance (has done() defined), returns the
// resolved value. Otherwise, returns the value itself.
Schematik.util.resolve = function(value, options) {

  options = _.assign({ optional: false }, options);

  if (!value) return value;

  if (_.isFunction(value.done)) {
    if (options.optional) {
      value = value.clone();
      delete value.schema.required;
    }
    return value.done();
  }
  else {
    return value;
  }

};

// Does one of the following:
//  - Resolves all elements of an array argument
//  - Resolves all properties of the object argument
Schematik.util.resolveAll = function(value, options) {
  return _.map(value, function(i) {
    return Schematik.util.resolve(i, options);
  });
};
