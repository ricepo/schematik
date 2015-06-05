// ------------------------------------------------------------------------- //
//                                                                           //
// Array utilities for Schematik.                                            //
//                                                                           //
// ------------------------------------------------------------------------- //
_         = require('lodash');
Schematik = require('./base');
Chainable = require('../util/chainable');

// Array type
Schematik.Array = function(options) {
  this.init(options);
  this.setType('array');

  // If preceded by a {unique} modifier, enable uniqueItems
  if (options && options.flags && options.flags.unique)
    this.schema.uniqueItems = true;
};

Schematik.Array.prototype = new Schematik();

// Clone
Schematik.Array.prototype.clone = function() {
  var self = this.self();
  var clone = new Schematik.Array();
  _.assign(clone, {
    flags:  _.cloneDeep(self.flags),
    schema: _.cloneDeep(self.schema),
    attrib: _.cloneDeep(self.attrib),
    chain:  self.chain
  });
  return clone;
};

// Register the array type
Schematik.register('array', Schematik.Array);

// Register the {unique} modifier with Schematik constructor as well
// so that we can also do something like Schematik.unique.array().
Chainable.modifier(Schematik, 'unique', null, {scope: 'all'});

// {of()}, type specifier (items)
Chainable.func(Schematik.Array, 'of', function() {
  self = this.self();

  // Call last chain with supplied arguments (if any)
  if (self.chain)
    return Function.prototype.apply.apply(self.chain, [self].concat(arguments));

  // If item type is not specified, this is a specifier
  if (!self.schema.items) {

    // No arguments, throw error
    if (arguments.length === 0)
      throw new Error('Schematik.Array.of: must have at least one argument');

    // One argument, directly assign
    else if (arguments.length === 1) {
      self.schema.items = Schematik.util.resolve(arguments[0],
        { optional: true });
    }

    // More, assign as array
    else if (arguments.length > 1) {
      self.schema.items = Schematik.util.resolveAll(arguments,
        { optional: true });
    }
  }

  // item type specified, this is a chain
  return self;

});

// {more()}, type specifier (additionalItems)
Chainable.func(Schematik.Array, 'more', function(value) {
  self = this.self();

  // Default to true if there is no value supplied
  if (_.isUndefined(value)) value = true;

  // Otherwise, check for value validity
  if (!_.isObject(value) && !_.isBoolean(value))
    throw new Error('Schematik.Array.more: value is not an object or boolean.');

  self.schema.additionalItems = Schematik.util.resolve(value,
    {optional: true});
  return self;
});

// Minimum / Maximum flags for length function
Chainable.modifier(Schematik.Array, 'min');
Chainable.modifier(Schematik.Array, 'max');

// {length()} function, does one of the following:
//  - if there is a maximum flag, set maxItems
//  - if there is a minimum flag, set minItems
//  - if two arguments are supplied, set maxItems and minItems
//  - if only one argument is supplied, set minItems and minItems to it
Chainable.func(Schematik.Array, 'length', function(a, b) {
  self = this.self();

  if (!_.isNumber(a))
    throw new Error('Schematik.Array.length: a must be a number.');

  // Set maximum if there is a flag
  if (self.flags.max)      { self.schema.maxItems = a; }
  else if (self.flags.min) { self.schema.minItems = a;}
  else if (_.isNumber(b))  {
    self.schema.minItems = a;
    self.schema.maxItems = b;
  }
  else {
    self.schema.minItems = self.schema.maxItems = a;
  }

  return self;
}, { preserveFlags: false });

// {unique} keyword, adds the uniqueItems constraint
Chainable.modifier(Schematik.Array, 'unique', function() {
  self = this.self();
  self.schema.uniqueItems = true;
  return self;
});

// Export the constructor
module.exports = Schematik.Array;
