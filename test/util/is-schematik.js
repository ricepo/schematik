import sinon        from 'sinon';
import { expect }   from 'chai';

import Schematik        from '../../src/schematik';
import { isSchematik }  from '../../src/util';

describe('.instantiate()', function() {

  beforeEach(function() {
    this.obj = new Schematik();
  });

  it('should return true when argument is a Schematik', function() {
    expect(isSchematik(this.obj)).to.equal(true);
  });

  it('should return false when argument is not a Schematik', function() {
    expect(isSchematik({ })).to.equal(false);
  });

});
