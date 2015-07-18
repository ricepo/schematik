// -------------------------------------------------------------------------- //
//                                                                            //
// Schematik main export file, along with middleware management.              //
// Copyright © 2015 Denis Luchkin-Zhou                                        //
//                                                                            //
// -------------------------------------------------------------------------- //
import Debug        from 'debug';
import Schematik    from './schematik';
import * as Util    from './util';

const  print      = Debug('schematik');

// Enable source maps when available
let sourcemaps = require.resolve('source-map-support');
if (sourcemaps) {
  print('Enabling sourcemap support.');
  require(sourcemaps).install();
}

// Load version from package.json
Schematik.version = require('../package.json').version;

// Set up a weak set to track used middleware
const middleware = new Set();

// Use middleware
Schematik.use = function(fn) {
  if (!middleware.has(fn)) {
    print(`Using middleware: ${fn.name}`);
    fn(this, Util);
    middleware.add(fn);
  }
  return this;
};

// Utilities
Schematik.util = Util;


Schematik.use(require('./flags/core'));
Schematik.use(require('./flags/unique'));
Schematik.use(require('./types/array'));

export default Schematik;
