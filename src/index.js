/**
 * Schematik
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */

import Schematik    from './schematik';
import * as Config  from './config';
import * as Util    from './util';

import FlagCore     from './addons/core';
import FlagUnique   from './addons/unique';
import SkArray      from './types/array';
import SkBoolean    from './types/boolean';
import SkInteger    from './types/integer';
import SkNull       from './types/null';
import SkNumber     from './types/number';
import SkObject     from './types/object';
import SkString     from './types/string';

export default Schematik;

/*!
 * Enable source map support if `source-map-support` is installed
 */
const sourcemaps = require.resolve('source-map-support');
/* istanbul ignore else */
if (sourcemaps) {
  require(sourcemaps).install();
}


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
