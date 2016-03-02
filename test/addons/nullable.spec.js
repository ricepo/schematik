var sinon          = require('sinon');
var expect         = require('chai').expect;

var load           = require('../loader.js');
var Schematik      = load('schematik.js');
var Nullable       = load('addons/nullable.js');
var Util           = load('util');


describe('.additional', function() {

  beforeEach(function() { this.obj = new Schematik(); });

  it('should add nullable property', function() {
    expect(this.obj).to.have.property('nullable');
    expect(this.obj.nullable).to.be.an.instanceof(Schematik);
  });

  it('should set the `nullable` flag when accessed', function() {
    this.other = this.obj.nullable;
    expect(this.other.flag('nullable')).to.equal(true);
    expect(this.obj.flag('nullable')).to.equal(undefined);
  });

  it('should overwrite done()', function() {
    const schema = this.obj.nullable.array().done();
    expect(schema)
      .to.deep.equal({
        oneOf: [
          { type: 'null' },
          { type: 'array' }
        ]
      });
  });

});