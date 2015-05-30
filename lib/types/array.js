// ------------------------------------------------------------------------- //
//                                                                           //
// Array utilities for Schematik.                                            //
//                                                                           //
// ------------------------------------------------------------------------- //
Schematik = require('./schematik');

// Array type
Schematik.Array = function (options) {
  if (options instanceof Schematik)
    _.assign(this, options);
  else if (options)
    _.assign(this.schema, options);
  this.setType('array');
};
Schematik.Array.prototype = new Schematik();
