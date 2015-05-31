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
  this.schema = { type: 'any' };
  if (Schematik.config.requireByDefault)
    this.schema.required = true;
}

// Version flag
Schematik.VERSION = '1.0.0';

// Default Configuration
Schematik.config = {
  // Allow properties not in schema
  allowAdditionalProperties: false,
  // Require by default
  requireByDefault: true
};


// Compiles the Schematik into a JSON Schema
Schematik.prototype.done = function () {
  return this.self().schema;
};

// {of} function performs one of two roles:
//  - if there is a chain that is not called, calls it with supplied arguments
//  - otherwise, returns the instance for further chaining
Chainable.func(Schematik, 'of', function () {
  self = this.self();
  if (!self.chain) return self;

  // Call last chain with supplied arguments
  return Function.prototype.apply.apply(self.chain, [self].concat(arguments));
});

// {optional} keyword, makes the schematik object optional
Chainable.modifier(Schematik, 'optional', function () {
  self = this.self();
  delete self.schema.required;
  return self;
}, {scope: 'all'});

// {required} keyword, makes the schematik object required
Chainable.modifier(Schematik, 'required', function () {
  self = this.self();
  self.schema.required = true;
  return self;
}, { scope: 'all' });

// ------------------------------------------------------------------------- //
// Non-functional chain helpers that serve as a syntactic sugar.             //
// ------------------------------------------------------------------------- //
chains = ['to', 'be', 'been', 'is', 'that', 'which', 'and', 'has', 'have',
          'with', 'at', 'same', 'in', 'a', 'an', 'the'];
_.map(chains, function (i) { Chainable.conjunction(Schematik, i); });

module.exports = Schematik;
