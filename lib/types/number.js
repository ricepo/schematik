// ------------------------------------------------------------------------- //
//                                                                           //
// Number/Integer utilities for Schematik.                                   //
//                                                                           //
// ------------------------------------------------------------------------- //
_         = require('lodash');
Chainable = require('../util/chainable');
Schematik = require('./base');

// Metaconstructor, or constructor generator
function NumBase (type) {
  return function(options) {
    this.init(options);

    if (this.schema.type === 'number' || this.schema.type === 'integer')
      this.schema.type = 'any';

    this.setType(type);
  };
}

// Number type
Schematik.Number            = NumBase('number');
Schematik.Integer           = NumBase('integer');
Schematik.Number.prototype  =
Schematik.Integer.prototype = new Schematik();

// Clone
Schematik.Number.prototype.clone = function() {
  var self = this.self();
  var clone = new Schematik.Number();
  _.assign(clone, {
    flags:  _.cloneDeep(self.flags),
    schema: _.cloneDeep(self.schema),
    attrib: _.cloneDeep(self.attrib),
    chain:  self.chain
  });
  return clone;
};

// Register the number/integer types
Schematik.register('number', Schematik.Number);
Schematik.register('integer', Schematik.Integer);

// {exclusive} keyword, makes min/max calls after this exclusive
Chainable.modifier(Schematik.Number, 'exclusive');

// {min()} function, specifies the minimum value
Chainable.func(Schematik.Number, 'min', function(value) {
  self = this.self();

  if (!_.isNumber(value))
    throw new Error('Schematik.min: value must be a number.');

  if (_.isNumber(self.schema.maximum) && value > self.schema.maximum)
    throw new Error('Schematik.min: value cannot be larger than max value.');

  self.schema.minimum = value;
  if (self.flags.exclusive)
    self.schema.exclusiveMinimum = true;

  return self;
});

// {max()} function, specifies the maximum value
Chainable.func(Schematik.Number, 'max', function(value) {
  self = this.self();

  if (!_.isNumber(value))
    throw new Error('Schematik.max: value must be a number.');

  if (_.isNumber(self.schema.minimum) && value < self.schema.minimum)
    throw new Error('Schematik.max: value cannot be smaller than min value.');

  self.schema.maximum = value;
  if (self.flags.exclusive)
    self.schema.exclusiveMaximum = true;

  return self;
});

// {range()} function, specifies both minimum and maximum values
Chainable.func(Schematik.Number, 'range', function(min, max) {
  return this.self().min(min).max(max);
});

// {multiple.of()} function, specifies that the number must be a multiple of
// the specified value.
Chainable.func(Schematik.Number, 'multiple', function(value) {
  self = this.self();

  if (!_.isNumber(value))
    throw new Error('Schematik.multiple: argument must be a number.');

  self.schema.multipleOf = value;
  return self;
});


// Export the constructor
module.exports = Schematik.Number;
