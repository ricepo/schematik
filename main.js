// ------------------------------------------------------------------------- //
//                                                                           //
// Schematik - human friendly JSON schema builder.                           //
//                                                                           //
// ------------------------------------------------------------------------- //
_         = require('lodash');
Schematik = require('./lib/types/schematik');

require('./lib/types/number');
require('./lib/types/boolean');
require('./lib/types/null');
require('./lib/types/string');

// Shortcut for creating a Schematik.Boolean
Schematik.prototype.boolean = function () {
  return new Schematik.Boolean(this.self());
};

// Shortcut for creating a Schematik.Number
Schematik.prototype.number = function () {
  return new Schematik.Number(this.self());
};

// Shortcut for creating a Schematik.Integer
Schematik.prototype.integer = function () {
  return new Schematik.Integer(this.self());
};

// Shortcut for creating a Schematik.String
Schematik.prototype.string = function () {
  return new Schematik.String(this.self());
};

_.assign(Schematik, Schematik.prototype);

module.exports = Schematik;
