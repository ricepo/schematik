/**
 * Schematik.Number
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */

const Schematik    = require('../schematik');
const instantiate  = require('../util/instantiate');

/**
 * Schematik.Number
 *
 * @classdesc       Schematik numbner type representation.
 */
class SkNumber extends Schematik {

  constructor(raw) {
    super(raw);
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

    const max = this.schema('maximum');
    if (max !== undefined && value > max) {
      throw new Error('{min} cannot be greater than {max}.');
    }

    const diff = { minimum: value };
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

    const min = this.schema('minimum');
    if (min !== undefined && value < min) {
      throw new Error('{max} cannot be less than {min}.');
    }

    const diff = { maximum: value };
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
    if (typeof min !== 'number' || typeof max !== 'number') {
      throw new Error('Min and max values must be numbers.');
    }
    if (min > max) {
      throw new Error('Min cannot be greater than max.');
    }

    const diff = { minimum: min, maximum: max };
    if (this.flag('exclusive')) {
      diff.exclusiveMinimum = true;
      diff.exclusiveMaximum = true;
    }
    return this.schema(diff).flag('exclusive', false);
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
module.exports = function(schematik, Util) {

  /*!
   * Expose SkNumber as Schematik.Number
   */
  schematik.Number = SkNumber;

  /*!
   * Attach the Schematik.number() shorthand.
   */
  schematik.number = schematik.prototype.number = function(...args) {
    return instantiate(this.self(), schematik.Number, ...args);
  };

  /*!
   * Attach number-specific properties.
   */
  const proto = schematik.Number.prototype;
  Util.addProperty(proto,  'exclusive', SkNumber.__exclusive);
  Util.addChainable(proto, 'min',       SkNumber.__min);
  Util.addChainable(proto, 'max',       SkNumber.__max);
  Util.addChainable(proto, 'range',     SkNumber.__range);
  Util.addChainable(proto, 'multiple',  SkNumber.__multiple);

};
module.exports.SkNumber = SkNumber;
