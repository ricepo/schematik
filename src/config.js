/**
 * Schematik.config
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */

module.exports = {

  /*!
   * Default flags that will be used for initializing new Schematiks.
   */
  defaultFlags: {
    required:  true
  },


  /*!
   * If true, disables hiding of special properties behind symbols.
   */
  devMode: false,


  /*!
   * If true, allows overwriting the `type` property of the schema.
   */
  allowTypeOverwrite: false,


  /*!
   * If true, allows additional properties in objects by default unless
   * explicitly specified otherwise.
   */
  allowAdditionalProperties: true,


  /*!
   * If true, allows overwriting existing object schema properties.
   */
  allowPropertyOverwrite: false,


  /*!
   * Set of conjunctions that return the Schematik without modifications.
   */
  conjunctions: new Set(
    [ 'to', 'be', 'been', 'is', 'that', 'which', 'and', 'has', 'have',
     'with', 'at', 'same', 'in', 'a', 'an', 'the' ]
  ),

  /*!
   * Set of type names that are allowed.
   * See section 3.5 of <http://json-schema.org/latest/json-schema-core.html>
   */
  whitelistedTypes: new Set(
    [ 'array', 'boolean', 'integer', 'number', 'null', 'object', 'string' ]
  )


};
