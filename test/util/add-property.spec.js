var sinon          = require('sinon');
var expect         = require('chai').expect;

var load           = require('../loader.js');
var Schematik      = load('schematik.js');
var addProperty    = load('util/add-property.js');



describe('.addProperty()', function() {

  beforeEach(function() {
    this.obj  = new Schematik();
    this.get1 = sinon.spy(function() { return 42; });
    this.get2 = sinon.spy();
    addProperty(this.obj, 'test1', this.get1);
    addProperty(this.obj, 'test2', this.get2);
  });

  it('should add a property to the context', function() {
    expect(this.obj.test1).to.be.a('number').and.to.equal(42);
  });

  it('should invoke {get} when accessed', function() {
    var a = this.obj.test1;
    expect(this.get1.calledOnce).to.equal(true);
  });

  it('should return {this} when {get} returns nothing', function() {
    expect(this.obj.test2).to.be.an.instanceof(Schematik);
  });

  it('should default to noop when {get} is undefined', function() {
    addProperty(this.obj, 'test3');
    expect(this.obj.test3).to.be.an.instanceof(Schematik);
  });

});
