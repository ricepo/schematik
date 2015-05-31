// ------------------------------------------------------------------------- //
//                                                                           //
// Schematik base class.                                                     //
//                                                                           //
// ------------------------------------------------------------------------- //
_         = require('lodash');
Schematik = require('./base');
Chainable = require('../util/chainable');

// Object type
Schematik.Object = function (options) {
  if (!Schematik.config.allowAdditionalProperties)
    this.schema.additionalProperties = false;

  this.init(options);
  this.setType('object');
};
Schematik.Object.prototype = new Schematik();

// Clone
Schematik.Object.prototype.clone = function () {
  var self = this.self();
  var clone = new Schematik.Object();
  _.assign(clone, {
    flags:  _.cloneDeep(self.flags),
    schema: _.cloneDeep(self.schema),
    chain:  self.chain
  });
  return clone;
};

// Register the object type
Schematik.register('object', Schematik.Object);

// Minimum / Maximum flags for properties function
Chainable.modifier(Schematik.Object, 'min');
Chainable.modifier(Schematik.Object, 'max');

// {count()} function, does one of the following:
//  - if there is a maximum flag, sets maxProperties
//  - if there is a minimum flag, sets minProperties
//  - if two arguments are supplied, sets both minProperties and maxProperties
//  - if only one argument is supplied, sets both min / max to it
Chainable.func(Schematik.Object, 'count', function (a, b) {
  self = this.self();

  if (!_.isNumber(a))
    throw new Error('Schematik.Object.propertyCount: a must be a number.');

  // Set maximum if there is a flag
  if (self.flags.max)      { self.schema.maxProperties = a; }
  else if (self.flags.min) { self.schema.minProperties = a;}
  else if (_.isNumber(b))  {
    self.schema.minProperties = a;
    self.schema.maxProperties = b;
  }
  else {
    self.schema.minProperties = self.schema.maxProperties = a;
  }

  return self;
}, { preserveFlags: false });


// Modifiers for changing the behavior of {property()}
Chainable.modifier(Schematik.Object, 'no');
Chainable.modifier(Schematik.Object, 'additional');
Chainable.modifier(Schematik.Object, 'pattern');

// {property()} function, adds the property to the properties list
Chainable.func(Schematik.Object, 'property', function (key, schema) {
  self = this.self();

  // If this is a pattern property
  if (self.flags.pattern) {
    if (!_.isRegExp(key))
      throw new Error('Schematik.Object.property: key must be a regex.');
    if (!_.isObject(schema))
      throw new Error('Schematik.Object.property: schema must be an object.');
    // Convert regex to string
    key = _.trim(key.toString(), '/');
    // Create the patternProperties if needed
    if (!self.schema.patternProperties)
      self.schema.patternProperties = { };
    // Do not allow overwrites
    if (self.schema.patternProperties[key])
      throw new Error('Schematik.Object.property: cannot overwrite ' +
        'pattern property ' + key);
    self.schema.patternProperties[key] = Schematik.util.resolve(schema);
  }

  // If this is an additional property
  else if (self.flags.additional) {
    // Do not allow overwrites
    if (self.schema.additionalProperties !== Schematik.config.allowAdditionalProperties &&
        !_.isUndefined(self.schema.additionalProperties))
      throw new Error('Schematik.Object.property: cannot overwrite ' +
        'additional property.');

    // If no parameters specified, check for {no} flag
    if (arguments.length === 0)
      self.schema.additionalProperties = !self.flags.no;
    else {
      // Check argument type
      if (!_.isBoolean(arguments[0]) && !_.isObject(arguments[0]))
        throw new Error('Schematik.Object.property: additional property ' +
          'must be a boolean or object.');
      self.schema.additionalProperties =
        Schematik.util.resolve(arguments[0], {optional: true});
    }
  }

  // If this is a normal property
  else {
    if (!_.isString(key))
      throw new Error('Schematik.Object.property: key must be a string.');
    if (!_.isObject(schema))
      throw new Error('Schematik.Object.property: schema must be an object.');
    // Create properties if needed
    if (!self.schema.properties)
      self.schema.properties = { };
    // Do not allow overwrites
    if (self.schema.properties[key])
      throw new Error('Schematik.Object.property: cannot overwrite property ' +
        key);
    self.schema.properties[key] = Schematik.util.resolve(schema);
  }

  return self;
}, { preserveFlags: false });

// {properties()} function, shorthand for multiple properties
Chainable.func(Schematik.Object, 'properties', function (value) {
  self = this.self();

  // Not compatible with {additional} flag unless there is a {no} flag.
  if (self.flags.additional) {
    if (!_.isUndefined(value))
      throw new Error('Schematik.Object.properties: value not supported for ' +
      'additional properties. Consider using Schematik.Object.property.');
    return self.additional.property(!self.flags.no);
  }

  // Validate arguments
  if (!_.isObject(value))
    throw new Error('Schematik.Object.properties: value must be an object.');

  // Retain a copy of flags
  var pattern = !!self.flags.pattern;

  // Add chained properties
  _.map(value, function (v, k) {
    if (pattern) self = self.pattern.property(new RegExp(k), v);
    else self = self.property(k, v);
  });

  return self;
});
