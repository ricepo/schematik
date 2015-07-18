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
 * @classdesc Schematik array type representation.
 */
class SkArray extends Schematik {

  constructor() {
    super();
    this.__type('array');
  }

}

/**
 * # .items()
 *
 * @desc          Specifies array item schemas.
 * @returns       A copy of Schematik with item schemas set.
 */
function items(...values) {
  if (arguments.length === 0) {
    throw new Error('Schematik.Array.items: need at least one argument.');
  }

  // Map all items to their final object forms
  values = values.map(i => (i instanceof Schematik) ? i.done() : i);

  // If current schema.items is a single object, wrap it into array
  let current = this[schema].items;
  current = current ? values.concat(current) : values;
  current = current.length === 1 ? current[0] : current;

  let result  = this.clone();
  result[schema] = this[schema].merge({ items: current });

  return result;
}


/**
 * Export a middleware function.
 */
export default function(Schematik, Util) {

  /**
   * Expose SkArray class as Schematik.Array
   */
  Schematik.Array = SkArray;

  /**
   * Attach the Schematik.array() shorthand.
   */
  Schematik.array = Schematik.prototype.array = function() {
    let result = new Schematik.Array();
    this.self().copyTo(result);
    return result;
  };

  /**
   * Attach shared flags
   */
  Range(Schematik.Array.prototype, Util);
  Additional(Schematik.Array.prototype, Util);

  /**
   * Attach array-specific methods.
   */
  Util.addChainable(Schematik.Array.prototype, 'items', items);
}
