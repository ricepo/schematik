var sinon          = require('sinon');
var expect         = require('chai').expect;

var load           = require('../loader.js');
var Schematik      = load('schematik.js');
var Additional     = load('addons/additional.js');
var Util           = load('util');


Additional(Schematik.prototype, Util);

describe('.additional', function() {

  beforeEach(function() { this.obj = new Schematik(); });

  it('should add all aliased properties', function() {
    expect(this.obj).to.have.property('more');
    expect(this.obj).to.have.property('additional');
    expect(this.obj.more).to.be.an.instanceof(Schematik);
    expect(this.obj.additional).to.be.an.instanceof(Schematik);
  });

  it('should add the `additional` flag when accessed', function() {
    this.other = this.obj.more;
    expect(this.other.flag('additional')).to.equal(true);
    expect(this.obj.flag('additional')).to.equal(undefined);
  });

});
