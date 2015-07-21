var sinon          = require('sinon');
var expect         = require('chai').expect;

var load           = require('../loader.js');
var Schematik      = load('index.js');
var instantiate    = load('util/instantiate.js');

describe('.instantiate()', function() {

  beforeEach(function() {
    this.obj = new Schematik()
      .flag('foo', 'bar')
      .schema({ a: '1', b: '2', c: '3' });
    this.result = instantiate(this.obj, Schematik.Null);
  });

  it('should create a new instance of the class', function() {
    expect(this.result).to.be.an.instanceof(Schematik.Null);
  });

  it('should preserve flags', function() {
    expect(this.result.flag('foo')).to.equal('bar');
  });

  it('should replace original type with new type', function() {
    expect(this.result.schema('type')).to.equal('null');
  });

});
