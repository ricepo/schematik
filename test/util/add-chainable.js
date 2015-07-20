import sinon            from 'sinon';
import { expect }       from 'chai';

import Schematik        from '../../src/schematik';
import { addChainable } from '../../src/util';

describe('.addChainable()', function() {

  beforeEach(function() {
    this.obj  = new Schematik().flag('hello', 'world');
    this.get  = sinon.spy(function() { return this.flag('foo', 'bar'); });
    this.call = sinon.spy(function() { return this.flag('foo'); });

    addChainable(this.obj, 'test', this.call, this.get);
  });

  it('should add a chainable property to the context', function() {
    expect(this.obj).to.have.property('test').that.is.a('function');
    expect(this.obj instanceof Schematik).to.be.true;
    expect(this.obj.flag('hello')).to.equal('world');
  });

  it('should invoge {get} when accessed', function() {
    this.obj.test;
    expect(this.get.calledOnce).to.be.true;
  });

  it('should invoke both {get} and {call} when called', function() {
    this.obj.test();
    expect(this.get.calledOnce).to.be.true;
    expect(this.call.calledOnce).to.be.true;
  });

  it('should return the result of {get} when accessed', function() {
    expect(this.obj.test.flag('foo')).to.equal('bar');
  });

  it('should return the result of {call} when called', function() {
    expect(this.obj.test()).to.equal('bar');
  });

  it('should set the `chain` flag when accessed', function() {
    expect(this.obj.test.flag('chain')).to.be.a('function');
  });

  it('should throw when {get} returns a non-Schematik value', function() {
    addChainable(this.obj, 'foo', function() { }, function() { return 'bar'; });
    expect(() => { this.obj.foo; }).to.throw('get() must return a Schematik object or undefined.');
  });
  
});
