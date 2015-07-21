var sinon          = require('sinon');
var expect         = require('chai').expect;

var load           = require('../loader.js');
var Schematik      = load('schematik.js');
var isSchematik    = load('util/is-schematik.js');

describe('.instantiate()', function() {

  beforeEach(function() {
    this.obj = new Schematik();
  });

  it('should return true when argument is a Schematik', function() {
    expect(isSchematik(this.obj)).to.equal(true);
  });

  it('should return false when argument is not a Schematik', function() {
    expect(isSchematik({ })).to.equal(false);
  });

});
