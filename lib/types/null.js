// ------------------------------------------------------------------------- //
//                                                                           //
// Null value utilities for Schematik.                                       //
//                                                                           //
// ------------------------------------------------------------------------- //
Schematik = require('./base');

// Boolean type
Schematik.Null = function (options) {
  if (options instanceof Schematik)
    _.assign(this, options);
  else if (options)
    _.assign(this.schema, options);
  this.setType('null');
};
Schematik.Null.prototype = new Schematik();

// Register the null type
Schematik.register('null', Schematik.Null);

// Export the constructor
module.exports = Schematik.Null;
