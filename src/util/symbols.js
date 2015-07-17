// -------------------------------------------------------------------------- //
//                                                                            //
// Symbols for accessing internal properties of Schematik.                    //
//                                                                            //
// -------------------------------------------------------------------------- //

// Middleware list
export const mwares  = Symbol.for('Schematik.mwares');

// Chainable method behaviors of the Schematik object
export const methods = Symbol.for('Schematik.methods');

// Behavior flags of the Schematik object
export const flags   = Symbol.for('Schematik.flags');

// Internal schema of the Schematik object
export const schema  = Symbol.for('Schematik.schema');
