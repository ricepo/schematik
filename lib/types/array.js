// ------------------------------------------------------------------------- //
//                                                                           //
// Array utilities for Schematik.                                            //
//                                                                           //
// ------------------------------------------------------------------------- //
_         = require('lodash');
Schematik = require('./schematik');
Chainable = require('../util/chainable');

// Array type
Schematik.Array = function (options) {
  if (options instanceof Schematik)
    _.assign(this, options);
  else if (options)
    _.assign(this.schema, options);
  this.setType('array');
};
Schematik.Array.prototype = new Schematik();

Schematik.Array.prototype.done = function () {

  // If this.items is a single Schematik object
  if (_.isFunction(this.items.done))
    return _.assign({ }, this.schema, {items: this.items.done()});

  // If this.items is a single non-Schematik object
  if (!_.isArray(this.items))
    return _.assign({ }, this.schema, {items: this.items});

  // If this.items is an array
  return _.assign({ }, this.schema, {items: _.map(this.items, function (i, v) {
      if (_.isFunction(i.done)) return i.done();
      else return i;
    })
  });
};

// {of()}, type specifier (items)
Chainable.register(Schematik.Array, 'of', function () {
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
      self.items = _.map(arguments);
  }

  // item type specified, this is a chain
  return self;

});

// {more()}, type specifier (additionalItems)
Chainable.register(Schematik.Array, 'more', function (value) {
  self = this.self();

  if (!_.isObject(value) && !_.isBoolean(value))
    throw new Error("Schematik.Array.more: value is not an object or boolean.");

  // If value is an object
  this.more = value;

  return self;
});

// Minimum / Maximum flags for length function
Chainable.keyword(Schematik.Array, 'min');
Chainable.keyword(Schematik.Array, 'max');

// {length()} function, does one of the following:
//  - if there is a maximum flag, set maxItems
//  - if there is a minimum flag, set minItems
//  - if two arguments are supplied, set maxItems and minItems
//  - if only one argument is supplied, set minItems and minItems to it
Chainable.register(Schematik.Array, 'length', function (a, b) {
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
