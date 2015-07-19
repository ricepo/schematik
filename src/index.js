/**
 * Schematik
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */

import Debug        from 'debug';
import Schematik    from './schematik';
import * as Util    from './util';

import FlagCore     from './flags/core';
import FlagUnique   from './flags/unique';
import FlagSugar    from './flags/sugar';
import SkArray      from './types/array';
import SkBoolean    from './types/boolean';
import SkInteger    from './types/integer';
import SkNull       from './types/null';
import SkNumber     from './types/number';

export default Schematik;
const  print = Debug('schematik');


/*!
 * Enable source map support if `source-map-support` is installed
 */
let sourcemaps = require.resolve('source-map-support');
if (sourcemaps) {
  print('Enabling sourcemap support.');
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
    print(`Using middleware: ${fn.name}`);
    fn(this, Util);
    middleware.add(fn);
  }
  return this;
};


/*!
 * Expose Schematik utilities via Schematik.util
 */
Schematik.util = Util;


/*!
 * Attach global flags to the Schematik.
 */
Schematik.use(FlagCore);
Schematik.use(FlagUnique);
Schematik.use(FlagSugar);

/*!
 * Attach builtin Schematik types.
 */
Schematik.use(SkArray);
Schematik.use(SkBoolean);
Schematik.use(SkInteger);
Schematik.use(SkNull);
Schematik.use(SkNumber);
