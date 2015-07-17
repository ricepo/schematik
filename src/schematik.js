// -------------------------------------------------------------------------- //
//                                                                            //
// Schematik base class.                                                      //
//                                                                            //
// -------------------------------------------------------------------------- //
import _               from 'lodash';
import Immutable       from 'seamless-immutable';

import * as Symbols    from './util/symbols';
import isSchematik     from './util/is-schematik';


export default class Schematik {

  constructor() {
    // 'Magic Number' to enable quick checks whether an object is a Schematik
    // This one has to be enumerable so that we can use __proto__
    this[Symbols.magic] = true;

    // Immutable object for storing flags and schema state
    this[Symbols.flags]  = Immutable({ });
    this[Symbols.schema] = Immutable({ });
  }

  // Creates a copy of the Schematik object.
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

}
