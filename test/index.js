import sinon        from 'sinon';
import { expect }   from 'chai';

describe('Schematik.Util', function() {
  require('./util/add-chainable');
  require('./util/add-method');
  require('./util/add-property');
  require('./util/instantiate');
  require('./util/is-schematik');
  require('./util/symbols');
});
