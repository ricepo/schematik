/**
 * Schematik.Array
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */

import Schematik    from '../schematik';
import { schema }   from '../util/symbols';
import instantiate  from '../util/instantiate';

import Range        from '../addons/range';
import Unique       from '../addons/unique';
import Additional   from '../addons/additional';
import concat       from '../util/array-concat';

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
   * .done()
   *
   * @override
   */
  done() {
    const result = super.done();
    if (this.flag('unique')) { result.uniqueItems = true; }
    return result;
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

      value = value instanceof Schematik ? value.done() : value;
      return this.schema({ additionalItems: value });
    }

    if (arguments.length === 0) {
      throw new Error('Schematik.Array.items: need at least one argument.');
    }

    // Map all items to their final object forms
    values = values.map(i => (i instanceof Schematik) ? i.done() : i);

    // If current schema.items is a single object, wrap it into array
    let current = this[schema].items;
    current = concat(current, ...values);
    current = current.length === 1 ? current[0] : current;

    return this.schema({ items: current });

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

    const diff = { };
    if      (this.flag('range') === 'max') {
      diff.maxItems = a;
    } else if (this.flag('range') === 'min') {
      diff.minItems = a;
    } else if (typeof b === 'number') {
      diff.minItems = a;
      diff.maxItems = b;
    } else {
      diff.minItems = diff.maxItems = a;
    }

    return this.schema(diff).flag('range', null);
  }

}


/*!
 * Export a middleware function.
 */
export default function(schematik, Util) {

  /*!
   * Expose SkArray class as Schematik.Array
   */
  schematik.Array = SkArray;

  /*!
   * Attach the Schematik.array() shorthand.
   */
  schematik.array = schematik.prototype.array = function(...args) {
    return instantiate(this.self(), schematik.Array, ...args);
  };

  const proto = schematik.Array.prototype;

  /*!
   * Attach shared flags
   */
  Range(proto, Util);
  Unique(proto, Util);
  Additional(proto, Util);

  /*!
   * Attach array-specific methods.
   */
  Util.addChainable(proto, 'items',  SkArray.__items);
  Util.addChainable(proto, 'len',    SkArray.__length);
  Util.addChainable(proto, 'count',  SkArray.__length);
  Util.addChainable(proto, 'length', SkArray.__length);

  /*!
   * Allow
   */

}
