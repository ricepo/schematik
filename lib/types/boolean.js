// ------------------------------------------------------------------------- //
//                                                                           //
// Boolean utilities for Schematik.                                          //
//                                                                           //
// ------------------------------------------------------------------------- //
Schematik = require('./base');

// Boolean type
Schematik.Boolean = function (options) {
  this.init(options);
  this.setType('boolean');
};
Schematik.Boolean.prototype = new Schematik();

// Register the boolean type
Schematik.register('boolean', Schematik.Boolean);

// Export the constructor
module.exports = Schematik.Boolean;
