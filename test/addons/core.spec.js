/**
 * test/addons/additional.spec.js
 *
 * @author  Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license MIT
 */
const Schematik    = dofile('index');
const Util         = dofile('util');


describe('.required', function() {

  it('should add the .required property', function() {

    const obj = new Schematik();
    expect(obj.required).to.be.an.instanceof(Schematik);
    expect(Schematik.required).to.be.an.instanceof(Schematik);

  });

  it('should set the `required` flag', function() {

    const obj = new Schematik();
    expect(obj.required.flag('required')).to.equal(true);
    expect(Schematik.required.flag('required')).to.equal(true);

  });

});

describe('.optional', function() {

  it('should add the .optional property', function() {

    const obj = new Schematik();
    expect(obj.optional).to.be.an.instanceof(Schematik);
    expect(Schematik.optional).to.be.an.instanceof(Schematik);

  });

  it('should set the `optional` flag', function() {

    const obj = new Schematik();
    expect(obj.optional.flag('required')).to.equal(false);
    expect(Schematik.optional.flag('required')).to.equal(false);

  });

});

describe('.nullable', function() {

  beforeEach(function() { this.obj = new Schematik(); });

  it('should add nullable property', function() {
    expect(this.obj)
      .to.have.property('nullable');
    expect(this.obj.nullable)
      .to.be.an.instanceof(Schematik);
  });

  it('should set the `nullable` flag when accessed', function() {
    this.other = this.obj.nullable;
    expect(this.other.flag('nullable'))
      .to.equal(true);
    expect(this.obj.flag('nullable'))
      .to.equal(undefined);
  });

  it('should produce correct schema', function() {
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

describe('.negate', function() {

  it('should add the .optional property', function() {

    const obj = new Schematik();
    expect(obj.no).to.be.an.instanceof(Schematik);
    expect(obj.not).to.be.an.instanceof(Schematik);

  });

  it('should set the `optional` flag', function() {

    const obj = new Schematik();
    expect(obj.no.flag('negate')).to.equal(true);
    expect(obj.not.flag('negate')).to.equal(true);

  });

});

describe('.of()', function() {

  beforeEach(function() {
    this.call = Sinon.spy(function() { return 42; });
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

    const obj = Schematik.enum(new Schematik(), { foo: 'bar' }, 'string');
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
      Schematik.enum();
    }).to.throw('Must have at least one argument.');

  });

});

describe('.one()', function() {

  it('should create a oneOf schematik', function() {
    const obj = Schematik.oneOf(new Schematik(), { foo: 'bar' });
    expect(obj.done()).to.deep.equal({
      oneOf: [ { }, { foo: 'bar' } ]
    });
  });

  it('should throw if no arguments are provided', function() {
    expect(function() {
      Schematik.oneOf();
    }).to.throw('Must have at least one argument.');
  });

});

describe('.all()', function() {

  it('should create an allOf schematik', function() {
    const obj = Schematik.allOf(new Schematik(), { foo: 'bar' });
    expect(obj.done()).to.deep.equal({
      allOf: [ { }, { foo: 'bar' } ]
    });
  });

  it('should throw if no arguments are provided', function() {
    expect(function() {
      Schematik.allOf();
    }).to.throw('Must have at least one argument.');
  });

});

describe('.any()', function() {

  it('should create an anyOf schematik', function() {
    const obj = Schematik.anyOf(new Schematik(), { foo: 'bar' });
    expect(obj.done()).to.deep.equal({
      anyOf: [ { }, { foo: 'bar' } ]
    });
  });

  it('should throw if no arguments are provided', function() {
    expect(function() {
      Schematik.anyOf();
    }).to.throw('Must have at least one argument.');
  });

});

describe('.not()', function() {

  it('should create a not schematik', function() {
    const obj1 = Schematik.not({ foo: 'bar' });
    const obj2 = Schematik.not(new Schematik());
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
