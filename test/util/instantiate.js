import sinon        from 'sinon';
import { expect }   from 'chai';

import Schematik        from '../../src/schematik';
import { instantiate }  from '../../src/util';

describe('.instantiate()', function() {

  // Derived class for testing
  class FakeSchematik extends Schematik {
    constructor() { super(); this.__type('null'); }
  }

  beforeEach(function() {
    this.obj = new Schematik()
      .flag('foo', 'bar')
      .schema({ a: '1', b: '2', c: '3' });
    this.result = instantiate(this.obj, FakeSchematik);
  });

  it('should create a new instance of the class', function() {
    expect(this.result).to.be.an.instanceof(FakeSchematik);
  });

  it('should preserve flags', function() {
    expect(this.result.flag('foo')).to.equal('bar');
  });

  it('should replace original type with new type', function() {
    expect(this.result.schema('type')).to.equal('null');
  });

});
