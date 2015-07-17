// -------------------------------------------------------------------------- //
//                                                                            //
// Schematik base class with core logic.                                      //
//                                                                            //
// -------------------------------------------------------------------------- //
import _               from 'lodash';
import Immutable       from 'seamless-immutable';

import * as Config     from '../config';
import * as Symbols    from '../util/symbols';
import isSchematik     from '../util/is-schematik';

export default class Schematik {

  constructor() {
    // Immutable object for storing flags and schema state
    this[Symbols.flags]  = Immutable(Config.defaultFlags);
    this[Symbols.schema] = Immutable({ });
  }

  // Creates a copy of the Schematik object.
  // XXX You have to override this for every derived type.
  clone() {
    let copy = new Schematik();
    this.copyTo(copy);
    return copy;
  }

  // Gets or sets a flag value.
  // If value is undefined, gets the flag value;
  // Otherwise, sets the flag to the value.
  flag(key, value) {

    if (typeof value === 'undefined') {
      return this[Symbols.flags][key];
    }

    let result = this.clone();
    result[Symbols.flags] = this[Symbols.flags].merge({ [key]: value });
    return result;
  }

  // Gets or sers a schema type.
  // If value is undefined, gets the type;
  // Otherwise, sets the type to the value.
  // Value must be a string supported by Json Schema IETF spec.
  type(value) {

    if (typeof value === 'undefined') {
      return this[Symbols.schema].type;
    }

    if (!Config.whitelistedTypes.has(value)) {
      throw new Error(`Invalid type value ${value}`);
    }

    if (!Config.allowTypeOverwrite && this[Symbols.schema].type) {
      throw new Error('Overwriting existing type is not allowed.');
    }

    let result = this.clone();
    result[Symbols.schema] = this[Symbols.schema].merge({ type: value });
    return result;
  }

  // Copies flags and schema to another Schematik object.
  // Since flags and schema are immutable, it is perfectly ok to just assign
  // them over without worrying about them being mutated after cloning.
  // This makes copying Schematik object a cheap operation.
  copyTo(that) {
    if (!isSchematik(that)) {
      throw new Error('Cannot copy to a non-Schematik object.');
    }
    that[Symbols.flags]  = this[Symbols.flags];
    that[Symbols.schema] = this[Symbols.schema];
  }

  // Custom toString() method
  toString() {
    return '[object Schematik]';
  }

}
