require("babel/polyfill");

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

  

});
