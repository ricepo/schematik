// ------------------------------------------------------------------------- //
//                                                                           //
// String utilities for Schematik.                                           //
//                                                                           //
// ------------------------------------------------------------------------- //
Schematik = require('./schematik');

// Boolean type
Schematik.String = function (options) {
  if (options instanceof Schematik)
    _.assign(this, options);
  else if (options)
    _.assign(this.schema, options);
  this.setType('string');
};
Schematik.String.prototype = new Schematik();
