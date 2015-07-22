var sinon          = require('sinon');
var expect         = require('chai').expect;

var load           = require('../loader.js');
var Schematik      = load('schematik.js');
var addMethod      = load('util/add-method.js');

describe('.addMethod()', function() {

  beforeEach(function() {
    this.obj  = new Schematik();
    this.call = sinon.spy(function(a) { return a; });
    addMethod(this.obj, 'test', this.call);
  });

  it('should add a method to the context', function() {
    expect(this.obj.test).to.be.a('function');
    expect(this.obj.test(42)).to.equal(42);
  });

  it('should invoke {call} when called', function() {
    this.obj.test();
    expect(this.call.calledOnce).to.equal(true);
  });

  it('should not be chainable', function() {
    expect(this.obj.test).not.to.be.an.instanceof(Schematik);
  });

  it('should return {this} when {call} returns nothing', function() {
    expect(this.obj.test()).to.be.an.instanceof(Schematik);
  });

});
