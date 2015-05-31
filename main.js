// ------------------------------------------------------------------------- //
//                                                                           //
// Schematik - human friendly JSON schema builder.                           //
//                                                                           //
// ------------------------------------------------------------------------- //
_         = require('lodash');
Schematik = require('./lib/types/base');

require('./lib/util/schematik.js');

require('./lib/types/array');
require('./lib/types/boolean');
require('./lib/types/number');
require('./lib/types/null');
require('./lib/types/string');
require('./lib/types/object');

module.exports = Schematik;
