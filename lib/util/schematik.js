// ------------------------------------------------------------------------- //
//                                                                           //
// Miscellaneous utilities for manipulating Schematiks.                      //
//                                                                           //
// ------------------------------------------------------------------------- //
_         = require('lodash');
Schematik = require('../types/base');

// Self-reference. Returns a new Schematik instance when called on constructor.
Schematik.self = function () { return new Schematik(); };
// ...or returns {this} when called on an existing Schematik instance.
Schematik.prototype.self = function () { return this; };

// Clone
Schematik.prototype.clone = function () {
  var self = this.self();
  var clone = new Schematik();
  _.assign(clone, {
    flags:  _.cloneDeep(self.flags),
    schema: _.cloneDeep(self.schema),
    chain:  self.chain
  });
  return clone;
};

// Sets the type of the underlying schema.
// Throws an error when there is already a different type set.
Schematik.prototype.setType = function (type) {
  var self = this.self();
  if (self.schema.type !== 'any' && self.schema.type !== type)
    throw new Error('Cannot change schema type from "' + self.schema.type +
      '" to "' + type + '".');
  self.schema.type = type;
  return self;
};

// Register a type
Schematik.register = function (name, constructor) {
  Schematik[name] = Schematik.prototype[name] = function () {
    return new constructor(this.self());
  };
};

// ------------------------------------------------------------------------- //
// Utility namespace for schematik.                                          //
// ------------------------------------------------------------------------- //
Schematik.util = { };

// If the value is a Schematik instance (has done() defined), returns the
// resolved value. Otherwise, returns the value itself.
Schematik.util.resolve = function (value, options) {

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
Schematik.util.resolveAll = function (value, options) {
  return _.map(value, function (i) {
    return Schematik.util.resolve(i, options);
  });
};
