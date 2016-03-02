/**
 * Schematik
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */

const Schematik    = require('./schematik');
const Config       = require('./config');
const Util         = require('./util');

const FlagCore     = require('./addons/core');
const FlagUnique   = require('./addons/unique');
const SkArray      = require('./types/array');
const SkBoolean    = require('./types/boolean');
const SkInteger    = require('./types/integer');
const SkNull       = require('./types/null');
const SkNumber     = require('./types/number');
const SkObject     = require('./types/object');
const SkString     = require('./types/string');


/*!
 * Load the module version from package.json
 */
Schematik.version = require('../package.json').version;


/*!
 * Use a set to track middleware
 */
const middleware = new Set();


/**
 * .use()
 *
 * @access          public
 * @desc            Extends the Schematik using the middleware.
 * @param           {fn} the middleware function.
 * @returns         {Schematik} class constructor for chaining.
 */
Schematik.use = function(fn) {
  if (!middleware.has(fn)) {
    fn(this, Util);
    middleware.add(fn);
  }
  return this;
};


/*!
 * Expose Schematik utilities via Schematik.util
 */
Schematik.config = Config;
Schematik.util   = Util;


/*!
 * Attach global flags to the Schematik.
 */
Schematik.use(FlagCore);
Schematik.use(FlagUnique);


/*!
 * Attach builtin Schematik types.
 */
Schematik.use(SkArray);
Schematik.use(SkBoolean);
Schematik.use(SkInteger);
Schematik.use(SkNull);
Schematik.use(SkNumber);
Schematik.use(SkObject);
Schematik.use(SkString);


/*!
 * Export
 */
module.exports = Schematik;
