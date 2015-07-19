/**
 * Schematik.Object
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */

import Immutable       from 'seamless-immutable';
import Schematik       from '../schematik';

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

    // additionalProperties mode
    if (this.flag('additional')) {
      throw new Error('Not Implemented');
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

      let diff = { patternProperties: { [key.source]: schema } };
      return this.flag('pattern', false).schema(diff, true);
    }

    // properties mode
    else {
      if (typeof key !== 'string') {
        throw new Error('Key must be a string.');
      }

      let diff = { properties: { [key.source]: schema } };
      return this.schema(diff, true);
    }

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


  /*!
   * Attach object-specific properties.
   */
  const proto = Schematik.Object.prototype;
  Util.addProperty(proto,  'pattern',  SkObject.__pattern);
  Util.addChainable(proto, 'count',    SkObject.__count);
  Util.addChainable(proto, 'property', SkObject.__property);
}
