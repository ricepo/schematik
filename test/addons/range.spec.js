var sinon          = require('sinon');
var expect         = require('chai').expect;

var load           = require('../loader.js');
var Schematik      = load('schematik.js');
var Range          = load('addons/range.js');
var Util           = load('util');

Range(Schematik.prototype, Util);

describe('.min', function() {

  beforeEach(function() { this.obj = new Schematik(); });

  it('should add the .min property', function() {
    expect(this.obj.min).to.be.an.instanceof(Schematik);
  });

  it('should add the `range` flag', function() {
    expect(this.obj.min.flag('range')).to.equal('min');
  });

});

describe('.max', function() {

  beforeEach(function() { this.obj = new Schematik(); });

  it('should add the .max property', function() {
    expect(this.obj.max).to.be.an.instanceof(Schematik);
  });

  it('should add the `range` flag', function() {
    expect(this.obj.max.flag('range')).to.equal('max');
  });

});
