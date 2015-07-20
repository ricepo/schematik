import sinon        from 'sinon';
import { expect }   from 'chai';

import Schematik        from '../../src/schematik';
import { addProperty }  from '../../src/util';

describe('.addProperty()', function() {

  beforeEach(function() {
    this.obj  = new Schematik();
    this.get1 = sinon.spy(() => { return 42; });
    this.get2 = sinon.spy();
    addProperty(this.obj, 'test1', this.get1);
    addProperty(this.obj, 'test2', this.get2);
  });

  it('should add a property to the context', function() {
    expect(this.obj.test1).to.be.a('number').and.to.equal(42);
  });

  it('should invoke {get} when accessed', function() {
    this.obj.test1;
    expect(this.get1.calledOnce).to.be.true;
  });

  it('should return {this} when {get} returns nothing', function() {
    expect(this.obj.test2).to.be.an.instanceof(Schematik);
  });

});
