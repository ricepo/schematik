// ------------------------------------------------------------------------- //
//                                                                           //
// Development wrapper, adds sourcemap support to node.js                    //
//                                                                           //
// ------------------------------------------------------------------------- //
require('source-map-support').install();

module.exports = require('./main');
