// ------------------------------------------------------------------------- //
//                                                                           //
// Schematik base class.                                                     //
//                                                                           //
// ------------------------------------------------------------------------- //
_ = require('lodash');

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


Object.defineProperty(Schematik.prototype, 'of', {
  enumerable: true,
  configurable: true,
  get: function () {

    

  }
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
          'with', 'at', 'of', 'same', 'in', 'a'];
for (var i = 0; i < chains.length; i++) {
  Object.defineProperty(Schematik.prototype, chains[i], {get: chain});
}

module.exports = Schematik;
