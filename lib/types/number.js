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
  return function (options) {
    if (options instanceof Schematik)
      _.assign(this, options);
    else if (options)
      _.assign(this.schema, options);

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

// Register the number/integer types
Schematik.register('number', Schematik.Number);
Schematik.register('integer', Schematik.Integer);

// {exclusive} keyword, makes min/max calls after this exclusive
Chainable.modifier(Schematik.Number, 'exclusive');

// {min()} function, specifies the minimum value
Chainable.func(Schematik.Number, 'min', function (value) {
  if (!_.isNumber(value))
    throw new Error('Schematik.min: value must be a number.');

  if (_.isNumber(this.schema.maximum) && value > this.schema.maximum)
    throw new Error('Schematik.min: value cannot be larger than max value.');

  this.schema.minimum = value;
  if (this.flags.exclusive)
    this.schema.exclusiveMinimum = true;

  return this;
});

// {max()} function, specifies the maximum value
Chainable.func(Schematik.Number, 'max', function (value) {
  if (!_.isNumber(value))
    throw new Error('Schematik.max: value must be a number.');

  if (_.isNumber(this.schema.minimum) && value < this.schema.minimum)
    throw new Error('Schematik.max: value cannot be smaller than min value.');

  this.schema.maximum = value;
  if (this.flags.exclusive)
    this.schema.exclusiveMaximum = true;

  return this;
});

// {range()} function, specifies both minimum and maximum values
Chainable.func(Schematik.Number, 'range', function (min, max) {
  return this.min(min).max(max);
});

// {multiple.of()} function, specifies that the number must be a multiple of
// the specified value.
Chainable.func(Schematik.Number, 'multiple', function (value) {
  self = this.self();

  if (!_.isNumber(value))
    throw new Error('Schematik.multiple: argument must be a number.');

  self.schema.multipleOf = value;
  return self;
});


// Export the constructor
module.exports = Schematik.Number;
