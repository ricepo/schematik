import sinon        from 'sinon';
import { expect }   from 'chai';

import Schematik    from '../../src/schematik';
import Additional   from '../../src/addons/additional';
import * as Util    from '../../src/util';

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
