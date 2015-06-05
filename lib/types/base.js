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

// ------------------------------------------------------------------------- //
// Non-functional chain helpers that serve as a syntactic sugar.             //
// ------------------------------------------------------------------------- //
chains = ['to', 'be', 'been', 'is', 'that', 'which', 'and', 'has', 'have',
          'with', 'at', 'same', 'in', 'a', 'an', 'the'];
_.map(chains, function(i) { Chainable.conjunction(Schematik, i); });

module.exports = Schematik;
