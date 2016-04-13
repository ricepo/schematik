/**
 * Schematik.String
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */

const Schematik    = require('../schematik');

const Range        = require('../addons/range');
const instantiate  = require('../util/instantiate');


/**
 * Schematik.String
 *
 * @classdesc       Schematik string type representation.
 */
class SkString extends Schematik {

  constructor(raw) {
    super(raw);
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

    const diff = { };
    if (this.flag('range') === 'min') {
      diff.minLength = a;
    } else if (this.flag('range') === 'max') {
      diff.maxLength = a;
    } else if (typeof b === 'number') {
      diff.minLength = a;
      diff.maxLength = b;
    } else {
      diff.minLength = diff.maxLength = a;
    }

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
module.exports = function(context, util) {

  /*!
   * Expose SkString as Schematik.String
   */
  context.String = SkString;

  /*!
   * Attach the Schematik.string() shorthand.
   */
  context.string = context.prototype.string = function(...args) {
    return instantiate(this.self(), SkString, ...args);
  };

  /*!
   * Attach shared flags.
   */
  Range(context.String.prototype, util);

  /*!
   * Attach string-specific properties.
   */
  const proto = context.String.prototype;
  util.addChainable(proto, 'len',     SkString.__length);
  util.addChainable(proto, 'length',  SkString.__length);
  util.addChainable(proto, 'matches', SkString.__matches);
  util.addChainable(proto, 'pattern', SkString.__matches);

};
module.exports.SkString = SkString;
