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

// Clone
Schematik.Null.prototype.clone = function () {
  var self = this.self();
  var clone = new Schematik.Null();
  _.assign(clone, {
    flags:  _.cloneDeep(self.flags),
    schema: _.cloneDeep(self.schema),
    attrib: _.cloneDeep(self.attrib),
    chain:  self.chain
  });
  return clone;
};

// Register the null type
Schematik.register('null', Schematik.Null);

// Export the constructor
module.exports = Schematik.Null;
