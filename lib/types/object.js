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
  this._props      = { };
  this._pattern    = { };
  this._additional = Schematik.config.allowAdditionalProperties ? null : false;

  this.init(options);
  this.setType('object');
};
Schematik.Object.prototype = new Schematik();

// Register the object type
Schematik.register('object', Schematik.Object);

// Overwrite the default {done()} to resolve subschemas
Schematik.Object.prototype.done = function () {
  self = this.self();

  // Make a copy of the schema
  var schema = _.assign({ }, self.schema);

  // Resolve properties
  if (Object.keys(self._props).length !== 0) {
    schema.properties = { };
    _.map(self._props, function (v, k) {
      schema.properties[k] = Schematik.util.resolve(v);
    });
  }

  // Resolve pattern properties
  if (Object.keys(self._pattern).length !== 0) {
    schema.patternProperties = { };
    _.map(self._pattern, function (v, k) {
      schema.patternProperties[k] = Schematik.util.resolve(v);
    });
  }

  // Resolve additional property
  if (_.isBoolean(self._additional) || _.isObject(self._additional)) {
    schema.additionalProperties =
      Schematik.util.resolve(self._additional, { forceOptional: true });
  }


  return schema;
};

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
    // Do not allow overwrites
    if (self._pattern[key])
      throw new Error('Schematik.Object.property: cannot overwrite ' +
        'pattern property ' + key);
    self._pattern[key] = schema;
  }

  // If this is an additional property
  else if (self.flags.additional) {
    self = this.self();

    // Do not allow overwrites
    if (self._additional !== Schematik.config.allowAdditionalProperties &&
        !_.isNull(self._additional))
      throw new Error('Schematik.Object.property: cannot overwrite ' +
        'additional property.');

    // If no parameters specified, check for {no} flag
    if (arguments.length === 0)
      self._additional = !self.flags.no;
    else {
      // Check argument type
      if (!_.isBoolean(arguments[0]) && !_.isObject(arguments[0]))
        throw new Error('Schematik.Object.property: additional property ' +
          'must be a boolean or object.');
      self._additional = arguments[0];
    }
  }

  // If this is a normal property
  else {
    if (!_.isString(key))
      throw new Error('Schematik.Object.property: key must be a string.');
    if (!_.isObject(schema))
      throw new Error('Schematik.Object.property: schema must be an object.');
    // Do not allow overwrites
    if (self._props[key])
      throw new Error('Schematik.Object.property: cannot overwrite property ' +
        key);
    self._props[key] = schema;
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
