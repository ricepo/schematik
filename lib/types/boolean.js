// ------------------------------------------------------------------------- //
//                                                                           //
// Boolean utilities for Schematik.                                          //
//                                                                           //
// ------------------------------------------------------------------------- //
Schematik = require('./base');

// Boolean type
Schematik.Boolean = function (options) {
  if (options instanceof Schematik)
    _.assign(this, options);
  else if (options)
    _.assign(this.schema, options);
  this.setType('boolean');
};
Schematik.Boolean.prototype = new Schematik();

// Register the boolean type
Schematik.register('boolean', Schematik.Boolean);

// Export the constructor
module.exports = Schematik.Boolean;
