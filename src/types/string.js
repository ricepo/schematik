/**
 * Schematik.String
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */

import Schematik    from '../schematik';

import Range        from '../flags/range';
import instantiate  from '../util/instantiate';

/**
 * Schematik.String
 *
 * @classdesc       Schematik string type representation.
 */
export class SkString extends Schematik {

  constructor() {
    super();
    this.__type('string');
  }


  /**
   * .length()
   *
   * @access        public
   * @desc          Sets the minimum and/or maximum allowed length.
   *                Behavior depends on `range` flag.
   * @param         {a} the first length value.
   * @param         {b} the second length value.
   * @returns       A copy of the Schematik with the length values set.
   */
  static __length(a, b) {
    if (typeof a !== 'number') {
      throw new Error('Length value must be a number.');
    }

    let diff = { };
    if      (this.flag('range') === 'min') { diff.minLength = a; }
    else if (this.flag('range') === 'max') { diff.maxLength = a; }
    else if (typeof b === 'number') {
      diff.minLength = a;
      diff.maxLength = b;
    }
    else { diff.minLength = diff.maxLength = a; }

    return this.schema(diff).flag('range', null);
  }


  /**
   * .matches()
   *
   * @access        public
   * @desc          Restricts the SkString to ones that match the regex.
   * @param         {pattern} an intance of RegExp
   * @returns       A copy of the Schematik with the pattern set.
   */
  static __matches(pattern) {
    if (!(pattern instanceof RegExp)) {
      throw new Error('Pattern must be an instance of RegExp.');
    }

    return this.schema({ pattern: pattern.source });
  }

}


/*!
 * Export a middleware function.
 */
export default function(Schematik, Util) {

  /*!
   * Expose SkString as Schematik.String
   */
  Schematik.String = SkString;

  /*!
   * Attach the Schematik.string() shorthand.
   */
  Schematik.string = Schematik.prototype.string = function() {
    return instantiate(this.self(), Schematik.String);
  };

  /*!
   * Attach shared flags.
   */
  Range(Schematik.String.prototype, Util);

  /*!
   * Attach string-specific properties.
   */
  const proto = Schematik.String.prototype;
  Util.addChainable(proto, 'len',     SkString.__length);
  Util.addChainable(proto, 'length',  SkString.__length);
  Util.addChainable(proto, 'matches', SkString.__matches);
  Util.addChainable(proto, 'pattern', SkString.__matches);

}
