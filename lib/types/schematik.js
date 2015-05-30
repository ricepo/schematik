// ------------------------------------------------------------------------- //
//                                                                           //
// Schematik base class.                                                     //
//                                                                           //
// ------------------------------------------------------------------------- //
_         = require('lodash');
Chainable = require('../util/chainable');

// Constructor
function Schematik(title) {
  this.flags  = { };
  this.schema = {
    type:    'any',
    required: true
  };
}

// Default Configuration
Schematik.config = {
  // Allow properties not in schema
  allowAdditionalProperties: false,
  // Require by default
  requireByDefault: false
};

// Gets the current instance of Schematik, which is:
//  - {this} if the method is called on an instance;
//  - {new Schematik()} is the method is called on constructor.
Schematik.prototype.self = function () {
  return !this.schema ? new Schematik() : this;
};

// Sets the type of self and prevents overwriting of types other than 'any'
Schematik.prototype.setType = function (type) {
  self = this.self();
  if (self.schema.type !== 'any')
    throw new Error('Cannot change type once it is set.');
  self.schema.type = type;
  return self;
};

// Compiles the Schematik into a JSON Schema
Schematik.prototype.done = function () {
  return this.self().schema;
};

// {of} function performs one of two roles:
//  - if there is a chain that is not called, calls it with supplied arguments
//  - otherwise, returns the instance for further chaining
Chainable.register(Schematik, 'of', function () {
  self = this.self();
  if (!self.chain) return self;

  // Call last chain with supplied arguments
  return self.chain.apply(self, arguments);
});

// {optional} keyword, makes the schematik object optional
Object.defineProperty(Schematik.prototype, 'optional', {
  enumerable: true,
  get: function () {
    self = this.self();
    delete self.schema.required;
    return self;
  }
});

// {required} keyword, makes the schematik object required
Object.defineProperty(Schematik.prototype, 'required', {
  enumerable: true,
  get: function () {
    self = this.self();
    self.schema.required = true;
    return self;
  }
});

// ------------------------------------------------------------------------- //
// Non-functional chain helpers that serve as a syntactic sugar.             //
// ------------------------------------------------------------------------- //
function chain () { return this.self(); }

chains = ['to', 'be', 'been', 'is', 'that', 'which', 'and', 'has', 'have',
          'with', 'at', 'same', 'in', 'a'];
for (var i = 0; i < chains.length; i++) {
  Object.defineProperty(Schematik.prototype, chains[i], {get: chain});
}

module.exports = Schematik;
