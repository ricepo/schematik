/**
 * Schematik.config
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */


/*!
 * Default flags that will be used for initializing new Schematiks.
 */
export var defaultFlags = {
  required:  true
};


/*!
 * If true, disables hiding of special properties behind symbols.
 */
export var devMode = true;


/*!
 * If true, allows overwriting the `type` property of the schema.
 */
export var allowTypeOverwrite = false;


/*!
 * Set of conjunctions that return the Schematik without modifications.
 */
export const conjunctions = new Set(
  ['to', 'be', 'been', 'is', 'that', 'which', 'and', 'has', 'have',
   'with', 'at', 'same', 'in', 'a', 'an', 'the']
);

/*!
 * Set of type names that are allowed.
 * See section 3.5 of <http://json-schema.org/latest/json-schema-core.html>
 */
export const whitelistedTypes = new Set(
  [ 'array', 'boolean', 'integer', 'number', 'null', 'object', 'string' ]
);
