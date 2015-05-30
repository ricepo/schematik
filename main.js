// ------------------------------------------------------------------------- //
//                                                                           //
// Schematik - human friendly JSON schema builder.                           //
//                                                                           //
// ------------------------------------------------------------------------- //
_         = require('lodash');
Schematik = require('./lib/types/schematik');

require('./lib/types/array');
require('./lib/types/boolean');
require('./lib/types/number');
require('./lib/types/null');
require('./lib/types/string');

// Shortcuts for creating specific Schematik types
Schematik.prototype.array   = function () {
  return new Schematik.Array(this.self());
};
Schematik.prototype.boolean = function () {
  return new Schematik.Boolean(this.self());
};
Schematik.prototype.integer = function () {
  return new Schematik.Integer(this.self());
};
Schematik.prototype.number  = function () {
  return new Schematik.Number(this.self());
};
Schematik.prototype.null    = function () {
  return new Schematik.Null(this.self());
};
Schematik.prototype.string  = function () {
  return new Schematik.String(this.self());
};

_.assign(Schematik, _.omit(Schematik.prototype, 'self'));

module.exports = Schematik;
