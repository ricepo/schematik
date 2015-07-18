/**
 * Schematik
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */

import Debug           from 'debug';
import Immutable       from 'seamless-immutable';

import * as Config     from './config';
import * as Symbols    from './util/symbols';
import isSchematik     from './util/is-schematik';

const  print         = Debug('schematik');

/**
 * Schematik
 *
 * @classdesc Base class for all Schematiks.
 */
export default class Schematik {

  constructor() {
    // Immutable object for storing flags and schema state
    this[Symbols.flags]  = Immutable(Config.defaultFlags);
    this[Symbols.schema] = Immutable({ });
  }

  /**
   * # .done()
   *
   * @access        public
   * @desc          Converts the Schematik into an actual JSON schema object.
   * @returns       A JSON schema object.
   */
  done() {
    return this[Symbols.schema].asMutable({ deep: true });
  }

  /**
   * # .self()
   *
   * @access        public
   * @desc          Used for certain properties that can be defined on both
   *                prototype and the class itself (static).
   * @returns       {this}
   */
  self() {
    return this;
  }

  /**
   * # .self()
   *
   * @access        public
   * @desc          Static version of .self(), serves the same purpose.
   * @returns       new Schematik object.
   */
  static self() {
    return new Schematik();
  }

  /**
   * # .clone()
   *
   * @access        public
   * @desc          Creates a copy of the Schematik object.
   * @returns       A copy of the Schematik object.
   */
  clone() {
    let copy = Object.create(this);
    this.copyTo(copy);
    return copy;
  }

  /**
   * # .flag(key, value)
   *
   * @access        public
   * @desc          Gets or sets the value of a flag.
   * @param         {key} name of the flag.
   * @param         {value} new value for the flag, if any.
   * @returns       Flag value when {value} is {undefined};
   *                otherwise a new copy of the Schematik object with the
   *                specified flag set to the {value}.
   */
  flag(key, value) {

    if (typeof value === 'undefined') {
      return this[Symbols.flags][key];
    }

    let result = this.clone();
    result[Symbols.flags] = this[Symbols.flags].merge({ [key]: value });
    return result;
  }

  /**
   * # .schema(value)
   *
   * @access        public
   * @desc          Gets or sets the schema of a flag.
   * @param         {value} schema property path; or a partial schema to merge
   * @returns       Value of the property path if {value} is a {string};
   *                otherwise a new copy of the Schematik object with the
   *                {value} merged into the schema.
   */
  schema(value) {
    if (typeof value === 'string') {
      return this[Symbols.schema][value];
    }

    if (typeof value === 'object') {
      let result = this.clone();
      result[Symbols.schema] = this[Symbols.schema].merge(value);
      return result;
    }

    throw new Error('Schematik.schema: value must be a string or an object.');
  }

  /**
   * # .clone()
   *
   * @access        public
   * @desc          Copies flags and schema to another Schematik object.
   * @param         {this} another Schematik object.
   * @returns       {this} for chaining.
   */
  copyTo(that) {
    if (!isSchematik(that)) {
      throw new Error('Cannot copy to a non-Schematik object.');
    }
    that[Symbols.flags]  = this[Symbols.flags];
    that[Symbols.schema] = this[Symbols.schema];
    return this;
  }

  /**
   * # .toString()
   *
   * @override
   * @access        public
   * @desc          Provides a custom string representation of the Schematik.
   * @returns       '[object Schematik]'
   */
  toString() {
    return '[object Schematik]';
  }

  /**
   * # .__type(value)
   *
   * @access        protected
   * @desc          Sets the type of the Schematik object.
   * @param         {value} name of the type, must be a string.
   * @returns       {this} for chaining.
   */
  __type(value) {

    if (typeof value === 'undefined') {
      return this[Symbols.schema].type;
    }

    if (!Config.whitelistedTypes.has(value)) {
      throw new Error(`Invalid type value ${value}`);
    }

    if (!Config.allowTypeOverwrite && this[Symbols.schema].type) {
      throw new Error('Overwriting existing type is not allowed.');
    }

    this[Symbols.schema] = this[Symbols.schema].merge({ type: value });
    return this;
  }

}
