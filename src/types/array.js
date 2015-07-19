/**
 * Schematik.Array
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */

import Schematik    from '../schematik';
import { schema }   from '../util/symbols';

import Range        from '../flags/range';
import Additional   from '../flags/additional';

/**
 * Schematik.Array
 *
 * @classdesc       Schematik array type representation.
 */
export class SkArray extends Schematik {

  constructor() {
    super();
    this.__type('array');
  }

  /**
   * # .items()
   *
   * @desc            Specifies array item schemas.
   * @returns         A copy of Schematik with item schemas set.
   */
  static __items(...values) {

    // If we have the `additional` flag, modify `additionalItems` instead
    if (this.flag('additional')) {
      let value = values[0] === undefined ? true : values[0];
      if (this.flag('negate')) { value = false; }

      if (typeof value !== 'object' && typeof value !== 'boolean') {
        throw new Error('Schematik.Array.items: value must be object or bool.');
      }

      return this.schema({ additionalItems: value });
    }

    // Otherwise, modify `items`
    else {
      if (arguments.length === 0) {
        throw new Error('Schematik.Array.items: need at least one argument.');
      }

      // Map all items to their final object forms
      values = values.map(i => (i instanceof Schematik) ? i.done() : i);

      // If current schema.items is a single object, wrap it into array
      let current = this[schema].items;
      current = current ? values.concat(current)  : values;
      current = current.length === 1 ? current[0] : current;

      return this.schema({ items: current });
    }

  }

  /**
   * # .length()
   *
   * @desc            Specifies array length.
   * @returns         A copy of Schematik with array lengths set.
   */
  static __length(a, b) {
    if (typeof a !== 'number') {
      throw new Error('Schematik.Array.length: length must be a number.');
    }

    let diff = { };
    if      (this.flag('range') === 'max') { diff.maxItems = a; }
    else if (this.flag('range') === 'min') { diff.minItems = a; }
    else if (typeof b === 'number') {
      diff.minItems = a;
      diff.maxItems = b;
    }
    else {
      diff.minItems = diff.maxItems = a;
    }

    return this.schema(diff);
  }

}


/*!
 * Export a middleware function.
 */
export default function(Schematik, Util) {

  /*!
   * Expose SkArray class as Schematik.Array
   */
  Schematik.Array = SkArray;

  /*!
   * Attach the Schematik.array() shorthand.
   */
  Schematik.array = Schematik.prototype.array = function() {
    let result = new Schematik.Array();
    this.self().copyTo(result);
    result.__type('array');
    return result;
  };

  const proto = Schematik.Array.prototype;

  /*!
   * Attach shared flags
   */
  Range(proto, Util);
  Additional(proto, Util);

  /*!
   * Attach array-specific methods.
   */
  Util.addChainable(proto, 'items',  SkArray.__items);
  Util.addChainable(proto, 'len',    SkArray.__length);
  Util.addChainable(proto, 'count',  SkArray.__length);
  Util.addChainable(proto, 'length', SkArray.__length);
}
