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

// Clone
Schematik.Boolean.prototype.clone = function () {
  var self = this.self();
  var clone = new Schematik.Boolean();
  _.assign(clone, {
    flags:  _.cloneDeep(self.flags),
    schema: _.cloneDeep(self.schema),
    chain:  self.chain
  });
  return clone;
};

// Register the boolean type
Schematik.register('boolean', Schematik.Boolean);

// Export the constructor
module.exports = Schematik.Boolean;
