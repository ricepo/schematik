// ------------------------------------------------------------------------- //
//                                                                           //
// Array utilities for Schematik.                                            //
//                                                                           //
// ------------------------------------------------------------------------- //
_         = require('lodash');
Schematik = require('./base');
Chainable = require('../util/chainable');

// Array type
Schematik.Array = function (options) {
  console.log(options);
  if (options instanceof Schematik)
    _.assign(this, options);
  else if (options)
    _.assign(this.schema, options);
  this.setType('array');
};
Schematik.Array.prototype = new Schematik();

// Register the array type
Schematik.register('array', Schematik.Array);

// Register the {unique} keyword with Schematik constructor as well
Chainable.modifier(Schematik, 'unique', null, {scope: 'all'});

// Overwrite the {done()} to resolve subschemas
Schematik.Array.prototype.done = function () {
  // Make a copy of the schema
  schema = _.assign({ }, this.schema);

  // If this.items is a single object
  if (this.items) {
    if (!_.isArray(this.items))
      schema.items = Schematik.util.resolve(this.items);
    // If this.items is an array
    else
      schema.items = Schematik.util.resolveAll(this.items);
  }
  // If additionalItems is a boolean
  if (this.additionalItems) {
    schema.additionalItems = Schematik.util.resolve(this.additionalItems);
  }

  return  schema;
};

// {of()}, type specifier (items)
Chainable.func(Schematik.Array, 'of', function () {
  self = this.self();

  // Call last chain with supplied arguments (if any)
  if (self.chain)
    return Function.prototype.apply.apply(self.chain, [self].concat(arguments));

  // If item type is not specified, this is a specifier
  if (!self.items || self.items.length === 0) {
    // No arguments, throw error
    if (arguments.length === 0)
      throw new Error("Schematik.Array.of: must have at least one argument");

    // One argument, directly assign
    if (arguments.length === 1)
      self.items = arguments[0];

    // More, assign as array
    if (arguments.length > 1)
      self.items = _.map(arguments, _.identity);
  }

  // item type specified, this is a chain
  return self;

});

// {more()}, type specifier (additionalItems)
Chainable.func(Schematik.Array, 'more', function (value) {
  self = this.self();

  // Default to true if there is no value supplied
  if (_.isUndefined(value)) value = true;

  // Otherwise, check for value validity
  if (!_.isObject(value) && !_.isBoolean(value))
    throw new Error("Schematik.Array.more: value is not an object or boolean.");

  this.additionalItems = value;
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
Chainable.func(Schematik.Array, 'length', function (a, b) {
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
Chainable.modifier(Schematik.Array, 'unique', function () {
  self = this.self();
  self.schema.uniqueItems = true;
  return self;
});

// Export the constructor
module.exports = Schematik.Array;
