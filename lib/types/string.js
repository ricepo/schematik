// ------------------------------------------------------------------------- //
//                                                                           //
// String utilities for Schematik.                                           //
//                                                                           //
// ------------------------------------------------------------------------- //
_         = require('lodash');
Schematik = require('./base');
Chainable = require('../util/chainable');

// Boolean type
Schematik.String = function(options) {
  this.init(options);
  this.setType('string');
};
Schematik.String.prototype = new Schematik();

// Clone
Schematik.String.prototype.clone = function() {
  var self = this.self();
  var clone = new Schematik.String();
  _.assign(clone, {
    flags:  _.cloneDeep(self.flags),
    schema: _.cloneDeep(self.schema),
    attrib: _.cloneDeep(self.attrib),
    chain:  self.chain
  });
  return clone;
};

// Register the array type
Schematik.register('string', Schematik.String);

// Minimum / Maximum flags for length function
Chainable.modifier(Schematik.String, 'min');
Chainable.modifier(Schematik.String, 'max');

// {length()} function, does one of the following:
//  - if there is a maximum flag, set maxLength
//  - if there is a minimum flag, set minLength
//  - if two arguments are supplied, set minLength and maxLength
//  - if only one argument is supplied, set minLength and maxLength to it
Chainable.func(Schematik.String, 'length', function(a, b) {
  self = this.self();

  if (!_.isNumber(a))
    throw new Error('Schematik.String.length: a must be a number.');

  // Set maximum if there is a flag
  if (self.flags.max)      { self.schema.maxLength = a; }
  else if (self.flags.min) { self.schema.minLength = a;}
  else if (_.isNumber(b))  {
    self.schema.minLength = a;
    self.schema.maxLength = b;
  }
  else {
    self.schema.minLength = self.schema.maxLength = a;
  }

  return self;
}, { preserveFlags: false });

// {matches()} function, specifies pattern match
Chainable.func(Schematik.String, 'matches', function(pattern) {
  self = this.self();

  if (!_.isRegExp(pattern))
    throw new Error('Schematik.String.matches: pattern must be a regex.');

  self.schema.pattern = _.trim(pattern.toString(), '/');
  return self;
});

// Export the constructor
module.exports = Schematik.String;
