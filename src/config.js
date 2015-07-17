// -------------------------------------------------------------------------- //
//                                                                            //
// Schematik user-configurable properties.                                    //
//                                                                            //
// -------------------------------------------------------------------------- //

// Initial flag values of Schematik objects.
export var defaultFlags = {
  required:  true
};

// If true, allows overwriting `type` of the Schematik.
export var allowTypeOverwrite = false;

// Set of type names that are allowed
// See section 3.5 of <http://json-schema.org/latest/json-schema-core.html>
export const whitelistedTypes = new Set(
  [ 'array', 'boolean', 'integer', 'number', 'null', 'object', 'string' ]
);
