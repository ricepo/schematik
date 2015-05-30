// ------------------------------------------------------------------------- //
//                                                                           //
// Number/Integer utilities for Schematik.                                   //
//                                                                           //
// ------------------------------------------------------------------------- //
_         = require('lodash');
Schematik = require('./schematik');

// Metaconstructor, or constructor generator
function NumBase (type) {
  return function (options) {
    if (options instanceof Schematik)
      _.assign(this, options);
    else if (options)
      _.assign(this.schema, options);
    this.setType(type);
  };
}

// Number type
Schematik.Number            = NumBase('number');
Schematik.Integer           = NumBase('integer');
Schematik.Number.prototype  =
Schematik.Integer.prototype = new Schematik();

// {exclusive} keyword, makes min/max calls after this exclusive
Object.defineProperty(Schematik.Number.prototype, 'exclusive', {
  enumerable: true,
  get: function () {
    this.flags.exclusive = true;
    return this;
  }
});

// {min()} function, specifies the minimum value
Schematik.Number.prototype.min = function (value) {
  if (!_.isNumber(value))
    throw new Error('Schematik.min: value must be a number.');

  this.schema.minimum = value;
  if (this.flags.exclusive)
    this.schema.exclusiveMinimum = true;

  return this;
};

// {max()} function, specifies the maximum value
Schematik.Number.prototype.max = function (value) {
  if (!_.isNumber(value))
    throw new Error('Schematik.max: value must be a number.');

  this.schema.maximum = value;
  if (this.flags.exclusive)
    this.schema.exclusiveMaximum = true;

  return this;
};

// {range()} function, specifies both minimum and maximum values
Schematik.Number.prototype.range = function (min, max) {
  return this.min(min).max(max);
};

// {multiple.of()} function, specifies that the number must be a multiple of
// the specified value.
Object.defineProperty(Schematik.Integer.prototype, 'multiple', {
  enumerable: true,
  get: function () {
    return {
      schematik: this,
      of: function (value) {
        self = this.schematik;

        if (!_.isNumber(value))
          throw new Error('Schematik.multiple.of: argument must be a number.');

        self.schema.multipleOf = value;

        return self;
      }
    };
  }
});
