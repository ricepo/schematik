// -------------------------------------------------------------------------- //
//                                                                            //
// Symbols for accessing internal properties of Schematik.                    //
//                                                                            //
// -------------------------------------------------------------------------- //

// Fallback for environments without symbols
var _symbol = Symbol;
if (!_symbol || process.env.DEBUG) {
  _symbol = function(name) { return `__${name}`; };
}

// Middleware list
export const mwares  = _symbol('mwares');

// Chainable method behaviors of the Schematik object
export const methods = _symbol('methods');

// Behavior flags of the Schematik object
export const flags   = _symbol('flags');

// Internal schema of the Schematik object
export const schema  = _symbol('schema');
