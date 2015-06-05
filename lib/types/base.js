// ------------------------------------------------------------------------- //
//                                                                           //
// Schematik base class.                                                     //
//                                                                           //
// ------------------------------------------------------------------------- //
_         = require('lodash');
Chainable = require('../util/chainable');

// Constructor
function Schematik() {
  this.flags  = { };
  this.attrib = { };
  this.schema = { type: 'any' };
  if (Schematik.config.requireByDefault)
    this.attrib.required = true;
}

// Version flag
Schematik.VERSION = '1.0.0';

// Default Configuration
Schematik.config = {
  allowAdditionalProperties: true,
  requireByDefault: true
};

// Initializes Schematik from an options object
Schematik.prototype.init = function(options) {
  if (options instanceof Schematik)
    _.assign(this, options);
  else if (options)
    this.schema = _.assign({ }, this.schema, options);
};

// Compiles the Schematik into a JSON Schema
Schematik.prototype.done = function() {
  return _.cloneDeep(this.schema);
};

// Self-refernece. Returns {this} when called on Schematik instance.
Schematik.prototype.self = function() { return this; };

// Clone
Schematik.prototype.clone = function() {
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
Schematik.prototype.setType = function(type) {
  var self = this.self();
  if (self.schema.type !== 'any' && self.schema.type !== type)
    throw new Error('Cannot change schema type from "' + self.schema.type +
      '" to "' + type + '".');
  self.schema.type = type;
  return self;
};

// {of} function performs one of two roles:
//  - if there is a chain that is not called, calls it with supplied arguments
//  - otherwise, returns the instance for further chaining
Chainable.func(Schematik, 'of', function() {
  self = this.self();
  if (!self.chain) return self;

  // Call last chain with supplied arguments
  return Function.prototype.apply.apply(self.chain, [self].concat(arguments));
});

// {optional} keyword, makes the schematik object optional
Chainable.modifier(Schematik, 'optional', function() {
  self = this.self();
  self.attrib.required = false;
  return self;
}, {scope: 'all'});

// {required} keyword, makes the schematik object required
Chainable.modifier(Schematik, 'required', function() {
  self = this.self();
  self.attrib.required = true;
  return self;
}, { scope: 'all' });

// {enum} function, specifies a set of possible values
Chainable.func(Schematik, 'enum', function() {
  var self = this.self();

  // This function has to have at least one argument
  if (arguments.length === 0) {
    throw new Error('Schematik.enum: must have at least one argument.');
  }

  // Apply to the schema
  self.schema.enum = _.map(arguments, function(value) {
    // Do not support functions
    if (_.isFunction(value)) {
      throw new Error('Schematik.enum: function arguments not supported.');
    }

    return value;
  });

  return self;
});

// {define} function, allows adding definitions to the schema
Chainable.func(Schematik, 'define', function(name, schema) {
  var self = this.self();

  // Name must be a string
  if (!_.isString(name)) {
    throw new Error('Schematik.define: name must be a string.');
  }

  // Schema must be a resolvable schema
  if (!_.isObject(schema) && !_.isFunction(schema.done)) {
    throw new Error('Schematik.define: schema must be a Schematik or object.');
  }

  // Create definitions object if not already present
  if (!self.schema.definitions) { self.schema.definitions = { }; }

  // Prevent overwrites
  if (self.schema.definitions[name]) {
    throw new Error('Schematik.define: can\'t overwrite an existing definition');
  }

  self.schema.definitions[name] = Schematik.util.resolve(schema);

  return self;
});

// {ref} function, allows referencing schema definitions
// NOTE: does NOT perform error checks
Schematik.ref = function(path) {
  if (!_.isString(path)) {
    throw new Error('Schematik.ref: path must be a string.');
  }

  var s = new Schematik();
  delete s.schema.type;
  s.schema.$ref = path;

  return s;
};

// {oneOf} function, specifies a match against exactly one of schemas
// NOTE: static only, creates a new instance.
Schematik.oneOf = function() {
  // Require at least one argument
  if (arguments.length === 0) {
    throw new Error('Schematik.oneOf: must have at least one argument.');
  }

  // Create a new instance and attach resolved schemas to enum
  var s = new Schematik();
  delete s.schema.type;
  s.schema.oneOf = _.map(arguments, Schematik.util.resolve);

  return s;
};

// {allOf} function, specifies a match against all schemas
// NOTE: static only, creates a new instance.
Schematik.allOf = function() {
  // Require at least one argument
  if (arguments.length === 0) {
    throw new Error('Schematik.allOf: must have at least one argument.');
  }

  // Create a new instance and attach resolved schemas to enum
  var s = new Schematik();
  delete s.schema.type;
  s.schema.allOf = _.map(arguments, Schematik.util.resolve);

  return s;
};

// {anyOf} function, specifies a match against at least one of the schemas
// NOTE: static only, creates a new instance.
Schematik.anyOf = function() {
  // Require at least one argument
  if (arguments.length === 0) {
    throw new Error('Schematik.anyOf: must have at least one argument.');
  }

  // Create a new instance and attach resolved schemas to enum
  var s = new Schematik();
  delete s.schema.type;
  s.schema.anyOf = _.map(arguments, Schematik.util.resolve);

  return s;
};

// {not} function, negates a match against the schema
Schematik.not = function(schema) {
  // Require exactly one argument
  if (!schema) {
    throw new Error('Schematik.not: schema is required.');
  }

  // Create a new instance and attach resolved schemas to enum
  var s = new Schematik();
  delete s.schema.type;
  s.schema.not = Schematik.util.resolve(schema);

  return s;
};

// ------------------------------------------------------------------------- //
// Non-functional chain helpers that serve as a syntactic sugar.             //
// ------------------------------------------------------------------------- //
chains = ['to', 'be', 'been', 'is', 'that', 'which', 'and', 'has', 'have',
          'with', 'at', 'same', 'in', 'a', 'an', 'the'];
_.map(chains, function(i) { Chainable.conjunction(Schematik, i); });

module.exports = Schematik;
