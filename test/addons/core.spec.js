var sinon          = require('sinon');
var expect         = require('chai').expect;

var load           = require('../loader.js');
var Schematik      = load('index.js');
var Core           = load('addons/core.js');
var Util           = load('util');



describe('.required', function() {

  it('should add the .required property', function() {

    var obj = new Schematik();
    expect(obj.required).to.be.an.instanceof(Schematik);
    expect(Schematik.required).to.be.an.instanceof(Schematik);

  });

  it('should set the `required` flag', function() {

    var obj = new Schematik();
    expect(obj.required.flag('required')).to.equal(true);
    expect(Schematik.required.flag('required')).to.equal(true);

  });

});

describe('.optional', function() {

  it('should add the .optional property', function() {

    var obj = new Schematik();
    expect(obj.optional).to.be.an.instanceof(Schematik);
    expect(Schematik.optional).to.be.an.instanceof(Schematik);

  });

  it('should set the `optional` flag', function() {

    var obj = new Schematik();
    expect(obj.optional.flag('required')).to.equal(false);
    expect(Schematik.optional.flag('required')).to.equal(false);

  });

});

describe('.negate', function() {

  it('should add the .optional property', function() {

    var obj = new Schematik();
    expect(obj.no).to.be.an.instanceof(Schematik);
    expect(obj.not).to.be.an.instanceof(Schematik);

  });

  it('should set the `optional` flag', function() {

    var obj = new Schematik();
    expect(obj.no.flag('negate')).to.equal(true);
    expect(obj.not.flag('negate')).to.equal(true);

  });

});

describe('.of()', function() {

  beforeEach(function() {
    this.call = sinon.spy(function() { return 42; });
    Util.addChainable(Schematik.prototype, 'test', this.call);
    this.obj = new Schematik();
  });

  it('should call last pending function if there is one', function() {
    expect(this.obj.test.of('foo!bar')).to.equal(42);
    expect(this.call.calledOnce).to.equal(true);
  });

  it('should return {this} when there is not pending function', function() {
    expect(this.obj.of()).to.be.an.instanceof(Schematik);
  });

});

describe('.enum()', function() {

  it('should create an enum schematik', function() {

    var obj = Schematik.enum(new Schematik(), { foo: 'bar' }, 'string');
    expect(obj.done()).to.deep.equal({
      enum: [
        { },
        { foo: 'bar' },
        'string'
      ]
    });

  });

  it('should throw if no arguments are provided', function() {

    expect(function() {
      var obj = Schematik.enum();
    }).to.throw('Must have at least one argument.');

  });

});

describe('.one()', function() {

  it('should create a oneOf schematik', function() {
    var obj = Schematik.oneOf(new Schematik(), { foo: 'bar' });
    expect(obj.done()).to.deep.equal({
      oneOf: [ { }, { foo: 'bar' } ]
    });
  });

  it('should throw if no arguments are provided', function() {
    expect(function() {
      var a = Schematik.oneOf();
    }).to.throw('Must have at least one argument.');
  });

});

describe('.all()', function() {

  it('should create an allOf schematik', function() {
    var obj = Schematik.allOf(new Schematik(), { foo: 'bar' });
    expect(obj.done()).to.deep.equal({
      allOf: [ { }, { foo: 'bar' } ]
    });
  });

  it('should throw if no arguments are provided', function() {
    expect(function() {
      var a = Schematik.allOf();
    }).to.throw('Must have at least one argument.');
  });

});

describe('.any()', function() {

  it('should create an anyOf schematik', function() {
    var obj = Schematik.anyOf(new Schematik(), { foo: 'bar' });
    expect(obj.done()).to.deep.equal({
      anyOf: [ { }, { foo: 'bar' } ]
    });
  });

  it('should throw if no arguments are provided', function() {
    expect(function() {
      var a = Schematik.anyOf();
    }).to.throw('Must have at least one argument.');
  });

});

describe('.not()', function() {

  it('should create a not schematik', function() {
    var obj1 = Schematik.not({ foo: 'bar' });
    var obj2 = Schematik.not(new Schematik());
    expect(obj1.done()).to.deep.equal({ not: { foo: 'bar' } });
    expect(obj2.done()).to.deep.equal({ not: { } });
  });

  it('should throw when parameter is not an object', function() {
    expect(function() { Schematik.not(); })
      .to.throw('Schema must be an object.');
    expect(function() { Schematik.not(42); })
      .to.throw('Schema must be an object.');
  });

});
