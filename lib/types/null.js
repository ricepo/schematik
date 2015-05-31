// ------------------------------------------------------------------------- //
//                                                                           //
// Null value utilities for Schematik.                                       //
//                                                                           //
// ------------------------------------------------------------------------- //
Schematik = require('./base');

// Boolean type
Schematik.Null = function (options) {
  this.init(options);
  this.setType('null');
};
Schematik.Null.prototype = new Schematik();

// Register the null type
Schematik.register('null', Schematik.Null);

// Export the constructor
module.exports = Schematik.Null;
