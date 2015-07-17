// -------------------------------------------------------------------------- //
//                                                                            //
// Schematik base class.                                                      //
//                                                                            //
// -------------------------------------------------------------------------- //
import _               from 'lodash';
import Immutable       from 'seamless-immutable';

import isSchematik     from './util/is-schematik';

const __flags     = Symbol.for('Schematik.flags');
const __schema    = Symbol.for('Schematik.schema');
const __schematik = Symbol.for('Schematik.schematik');

export default class Schematik {

  constructor() {
    // 'Magic Number' to enable quick checks whether an object is a Schematik
    // This one has to be enumerable so that we can use __proto__
    this[__schematik] = true;

    // Immutable object for storing flags and schema state
    this[__flags]  = Immutable({ });
    this[__schema] = Immutable({ });
  }

  // Creates a copy of the Schematik object.
  // Since flags and schema are immutable, it is perfectly ok to just assign
  // them over without worrying about them being mutated after cloning.
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
      return this[__flags][key];
    }

    let result = this.clone();
    result[__flags] = this[__flags].merge({ [key]: value });

    return result;
  }

  // Copies flags and schema to another Schematik object
  copyTo(that) {
    if (!isSchematik(that)) {
      throw new Error('Cannot copy to a non-Schematik object.');
    }
    that[__flags]  = this[__flags];
    that[__schema] = this[__schema];
  }

}
