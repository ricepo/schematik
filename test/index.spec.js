/**
 * test/index.spec.js
 *
 * @author  Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license MIT
 */

const Chai         = require('chai');
Chai.use(require('sinon-chai'));
Chai.use(require('chai-properties'));
Chai.use(require('chai-as-promised'));

const Path         = require('path');
const Root         = require('app-root-path');
Root.setPath(Path.resolve(__dirname, '../src'));

/*!
 * Setup global stuff here.
 */
global.dofile      = Root.require;
global.expect      = Chai.expect;
global.Sinon       = require('sinon');

/*!
 * Start tests.
 */
require('./schematik.spec.js');

describe('Schematik.Util', function() {
  require('./util/add-chainable.spec.js');
  require('./util/add-method.spec.js');
  require('./util/add-property.spec.js');
  require('./util/instantiate.spec.js');
  require('./util/is-schematik.spec.js');
});

describe('Schematik.Addons', function() {
  require('./addons/core.spec.js');
  require('./addons/additional.spec.js');
  require('./addons/range.spec.js');
  require('./addons/unique.spec.js');
});

describe('Schematik.Types', function() {
  require('./types/array.spec.js');
  require('./types/boolean.spec.js');
  require('./types/integer.spec.js');
  require('./types/null.spec.js');
  require('./types/number.spec.js');
  require('./types/object.spec.js');
  require('./types/string.spec.js');
});
