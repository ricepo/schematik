/**
 * Schematik.Object
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */

import Immutable       from 'seamless-immutable';
import Schematik       from '../schematik';

import Range           from '../addons/range';
import Additional      from '../addons/additional';

import * as Config     from '../config';
import { isSchematik } from '../util';
import { schema }      from '../util/symbols';
import instantiate     from '../util/instantiate';

/**
 * Schematik.Object
 *
 * @classdesc       Schematik object type representation.
 */
export class SkObject extends Schematik {

  constructor() {
    super();
    this.__type('object');
    this[schema] = this[schema]
      .merge({ additionalProperties: Config.allowAdditionalProperties });
  }


  /**
   * .pattern
   *
   * @access        public
   * @desc          Sets the `pattern` flag to true.
   * @returns       A copy of the Schematik with the `pattern` flag set.
   */
  static __pattern() {
    return this.flag('pattern', true);
  }


  /**
   * .count()
   *
   * @access        public
   * @desc          Sets the property count of the object. Behavior of this
   *                function depends on the `range` flag and number of args.
   * @param         {a} the first property count value.
   * @param         {b} the second property count value.
   * @returns       A copy of the Schematik with the property count set.
   */
  static __count(a, b) {
    if (typeof a !== 'number') {
      throw new Error('Count value must be a number.');
    }

    let diff = { };
    if      (this.flag('range') === 'min') { diff.minProperties = a; }
    else if (this.flag('range') === 'max') { diff.maxProperties = a; }
    else if (typeof b === 'number') {
      diff.minProperties = a;
      diff.maxProperties = b;
    }
    else { diff.minProperties = diff.maxProperties = a; }

    return this.schema(diff).flag('range', null);
  }


  /**
   * .property()
   *
   * @access        public
   * @desc          Adds a property along with its schema.
   * @param         {key} name of the property.
   * @param         {schema} schema for the property value.
   * @returns       A copy of the Schematik with the property added.
   */
  static __property(key, schema) {
    let overwrite  = Config.allowPropertyOverwrite;
    let additional = Config.allowAdditionalProperties;

    // additionalProperties mode
    if (this.flag('additional')) {
      let current = this.schema('additionalProperties');
      if (!overwrite && current != additional && additional !== undefined) {
        throw new Error('Cannot overwrite additional properties.');
      }

      // Apply the `negate` flag if there are no arguments
      if (arguments.length === 0) {
        return this
          .schema({ additionalProperties: !this.flag('negate') })
          .flag('additional', false)
          .flag('pattern',    false)
          .flag('negate',     false);
      }

      let value = arguments[0];
      if (typeof value !== 'boolean' && typeof value !== 'object') {
        throw new Error('Additional property must be a boolean or an object.');
      }

      schema = isSchematik(value) ? value.done() : value;
      return this
        .schema({ additionalProperties: schema })
        .flag('additional', false)
        .flag('pattern',    false)
        .flag('negate',     false);
    }

    // Check that schema is valid
    if (typeof schema !== 'object') {
      throw new Error('Schema must be an object.');
    }
    schema = isSchematik(schema) ? schema.done() : schema;

    // patternProperties mode
    if (this.flag('pattern')) {
      if (!(key instanceof RegExp)) {
        throw new Error('Key must be a RegExp.');
      }
      let current = this.schema('patternProperties');
      if (!overwrite && current && current[key.source]) {
        throw new Error(`Cannot overwrite pattern property: ${key.source}`);
      }

      let diff = { patternProperties: { [key.source]: schema } };
      return this.flag('pattern', false).schema(diff, true);
    }

    // properties mode
    if (typeof key !== 'string') {
      throw new Error('Key must be a string.');
    }
    let current = this.schema('properties');
    if (!overwrite && current && current[key]) {
      throw new Error(`Cannot overwrite property: ${key}`);
    }

    let diff = { properties: { [key]: schema } };
    return this.schema(diff, true);

  }


  /**
   * .properties()
   *
   * @access        public
   * @desc          Adds multiple properties along with their schemas.
   * @param         {value} a hash of property names to their schemas.
   * @returns       A copy of the Schematik with the properties added.
   */
  static __properties(value) {

    // If there is an `additional` flag, value must be undefined
    if (this.flag('additional')) {
      if (value !== undefined) {
        throw new Error('Value not supported with `additional` flag.');
      }
      return this.additional.property();
    }

    if (typeof value !== 'object') {
      throw new Error('Value must be an object.');
    }

    let result  = this;
    let pattern = this.flag('pattern');
    Object.keys(value).forEach((key) => {
      result = result.flag('pattern', pattern).property(key, value[key]);
    });
    return result;
  }

}


/*!
 * Export a middleware function.
 */
export default function(Schematik, Util) {

  /*!
   * Expose SkObject as Schematik.Object
   */
  Schematik.Object = SkObject;

  /*!
   * Attach the Schematik.object() shorthand.
   */
  Schematik.object = Schematik.prototype.object = function() {
    return instantiate(this.self(), Schematik.Object);
  };

  /*!
   * Attach shared flags.
   */
  Range(Schematik.Object.prototype, Util);
  Additional(Schematik.Object.prototype, Util);

  /*!
   * Attach object-specific properties.
   */
  const proto = Schematik.Object.prototype;
  Util.addProperty(proto,  'pattern',    SkObject.__pattern);
  Util.addChainable(proto, 'count',      SkObject.__count);
  Util.addChainable(proto, 'property',   SkObject.__property);
  Util.addChainable(proto, 'properties', SkObject.__properties);
}
