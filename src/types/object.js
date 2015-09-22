/**
 * Schematik.Object
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */

import Schematik       from '../schematik';

import Range           from '../addons/range';
import Additional      from '../addons/additional';

import * as Config     from '../config';
import { isSchematik,
         arrayConcat } from '../util';
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

    const diff = { };
    if (this.flag('range') === 'min') {
      const max = this.schema('maxProperties');
      if (max !== undefined && max < a) {
        throw new Error('{min} cannot be greater than {max}');
      }
      diff.minProperties = a;
    } else if (this.flag('range') === 'max') {
      const min = this.schema('minProperties');
      if (min !== undefined && min > a) {
        throw new Error('{max} cannot be less than {min}');
      }
      diff.maxProperties = a;
    } else if (typeof b === 'number') {
      if (b < a) {
        throw new Error('{min} cannot be greater than {max}');
      }
      diff.minProperties = a;
      diff.maxProperties = b;
    } else {
      diff.minProperties = diff.maxProperties = a;
    }

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
    const overwrite  = Config.allowPropertyOverwrite;
    const additional = Config.allowAdditionalProperties;

    // additionalProperties mode
    if (this.flag('additional')) {
      const current = this.schema('additionalProperties');
      if (!overwrite && current !== additional && additional !== undefined) {
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

      const value = arguments[0];
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
    let required = false;
    if (isSchematik(schema)) {
      required = schema.flag('required');
      schema   = schema.done();
    }

    // patternProperties mode
    if (this.flag('pattern')) {
      if (!(key instanceof RegExp)) {
        throw new Error('Key must be a RegExp.');
      }
      const current = this.schema('patternProperties');
      if (!overwrite && current && current[key.source]) {
        throw new Error(`Cannot overwrite pattern property: ${key.source}`);
      }

      const diff = { patternProperties: { [key.source]: schema } };
      return this.flag('pattern', false).schema(diff, true);
    }

    // properties mode
    if (typeof key !== 'string') {
      throw new Error('Key must be a string.');
    }
    const current = this.schema('properties');
    if (!overwrite && current && current[key]) {
      throw new Error(`Cannot overwrite property: ${key}`);
    }


    const diff = { properties: { [key]: schema } };
    const creq = this.schema('required');
    if (required) { diff.required = arrayConcat(creq, key); }
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

    const pattern = this.flag('pattern') || false;
    return Object.keys(value).reduce((schema, key) => {
      const s = value[key];
      if (pattern) { key = new RegExp(key); }
      return schema.flag('pattern', pattern).property(key, s);
    }, this);
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
