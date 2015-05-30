// ------------------------------------------------------------------------- //
//                                                                           //
// Null value utilities for Schematik.                                       //
//                                                                           //
// ------------------------------------------------------------------------- //
Schematik = require('./schematik');

// Boolean type
Schematik.Null = function (options) {
  if (options instanceof Schematik)
    _.assign(this, options);
  else if (options)
    _.assign(this.schema, options);
  this.setType('null');
};
Schematik.Null.prototype = new Schematik();
