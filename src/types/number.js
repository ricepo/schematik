/**
 * Schematik.Number
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */

import Schematik    from '../schematik';
import instantiate  from '../util/instantiate';

/**
 * Schematik.Number
 *
 * @classdesc       Schematik numbner type representation.
 */
export class SkNumber extends Schematik {

  constructor() {
    super();
    this.__type('number');
  }

  /**
   * .exclusive
   *
   * @access          public
   * @desc            Sets the `exclusive` flag.
   * @returns         A copy of the Schematik with the `exclusive` flag set.
   */
  static __exclusive() {
    return this.flag('exclusive', true);
  }


  /**
   * .min()
   *
   * @access          public
   * @desc            Specifies the minimum value, inclusive unless `exclusive` is
   *                  set to true.
   * @param           {value} minimum value, must be a number.
   * @returns         A copy of the Schematik with the minimum value set.
   */
  static __min(value) {
    if (typeof value !== 'number') {
      throw new Error('{value} must be a number.');
    }

    if (this.schema('max') && value > this.schema('max')) {
      throw new Error('{min} cannot be greater than {max}.');
    }

    let diff = { minimum: value };
    if (this.flag('exclusive')) { diff.exclusiveMinimum = true; }
    return this.schema(diff).flag('exclusive', false);
  }


  /**
   * .max()
   *
   * @access          public
   * @desc            Specifies the maximum value, inclusive unless `exclusive` is
   *                  set to true.
   * @param           {value} maximum value, must be a number.
   * @returns         A copy of the Schematik with the maximum value set.
   */
  static __max(value) {
    if (typeof value !== 'number') {
      throw new Error('{value} must be a number.');
    }

    if (this.schema('min') && value < this.schema('min')) {
      throw new Error('{max} cannot be less than {min}.');
    }

    let diff = { maximum: value };
    if (this.flag('exclusive')) { diff.exclusiveMaximum = true; }
    return this.schema(diff).flag('exclusive', false);
  }


  /**
   * .range()
   *
   * @access          public
   * @desc            Specifies both minimum and maximum values. Inclusive unless
   *                  the `exclusive` flag is set to true.
   * @param           {min} the minimum value, must be a number.
   * @param           {max} the maximum value, must be a number.
   * @returns         A copy of the Schematik with both minimum and maximum values
   */
  static __range(min, max) {
    let flag   = this.flag('exclusive');
    return this.min(min).flag('exclusive', flag).max(max);
  }


  /**
   * .multiple()
   *
   * @access          public
   * @desc            Restricts the number to the multiples of the {value}.
   * @param           {value} the divider value.
   * @returns         A copy of the Schematik with multipleOf value set.
   */
  static __multiple(value) {
    if (typeof value !== 'number') {
      throw new Error('{value} must be a number.');
    }

    return this.schema({ multipleOf: value });
  }

}

/*!
 * Export a middleware function.
 */
export default function(Schematik, Util) {

  /*!
   * Expose SkNumber as Schematik.Number
   */
  Schematik.Number = SkNumber;

  /*!
   * Attach the Schematik.number() shorthand.
   */
  Schematik.number = Schematik.prototype.number = function() {
    return instantiate(this.self(), Schematik.Number);
  };

  /*!
   * Attach number-specific properties.
   */
  const proto = Schematik.Number.prototype;
  Util.addProperty(proto,  'exclusive', SkNumber.__exclusive);
  Util.addChainable(proto, 'min',       SkNumber.__min);
  Util.addChainable(proto, 'max',       SkNumber.__max);
  Util.addChainable(proto, 'range',     SkNumber.__range);
  Util.addChainable(proto, 'multiple',  SkNumber.__multiple);

}
