// -------------------------------------------------------------------------- //
//                                                                            //
// Symbols for accessing internal properties of Schematik.                    //
//                                                                            //
// -------------------------------------------------------------------------- //

// Used for accessing the property that marks an object as a Schematik
export const magic   = Symbol.for('Schematik.schematik');

// Used for accessing behavior flags of the Schematik object
export const flags   = Symbol.for('Schematik.flags');

// Used for accessing internal schema of the Schematik object
export const schema  = Symbol.for('Schematik.schema');

// Used for accessing chainable method behaviors of the Schematik object
export const methods = Symbol.for('Schematik.methods');
