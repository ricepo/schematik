// ------------------------------------------------------------------------- //
//                                                                           //
// Boolean utilities for Schematik.                                          //
//                                                                           //
// ------------------------------------------------------------------------- //
Schematik = require('./schematik');

// Boolean type
Schematik.Boolean = function (options) {
  if (options instanceof Schematik)
    _.assign(this, options);
  else if (options)
    _.assign(this.schema, options);
  this.setType('boolean');
};
Schematik.Boolean.prototype = new Schematik();
