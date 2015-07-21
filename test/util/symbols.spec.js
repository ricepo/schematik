import sinon        from 'sinon';
import { expect }   from 'chai';

import Schematik        from '../../src';
import * as Symbols     from '../../src/util/symbols';

describe('.symbols', function() {

  it.skip('should generate symbols when not in dev mode', function() {
    Schematik.dev(false);
    expect(Symbols.flags).to.be.an.instanceof(Symbol);
  });

  it('should generate strings when in dev mode', function() {
    Schematik.dev(true);
    expect(Symbols.flags).to.be.a('string');
  });

});
