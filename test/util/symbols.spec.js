var sinon          = require('sinon');
var expect         = require('chai').expect;

var load           = require('../loader.js');
var Schematik      = load('index.js');
var Symbols        = load('util/symbols.js');

describe('.symbols', function() {

  it.skip('should generate symbols when not in dev mode', function() {
    Schematik.dev(false);
    expect(Symbols.flags).to.be.an.instanceof(Symbol);
  });

  it('should generate strings when in dev mode', function() {
    Schematik.dev(true);
    expect(Symbols.flags).to.be.a('string');
  });

});
