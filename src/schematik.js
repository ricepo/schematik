// -------------------------------------------------------------------------- //
//                                                                            //
// Schematik base class.                                                      //
//                                                                            //
// -------------------------------------------------------------------------- //
import _               from 'lodash';
import Immutable       from 'seamless-immutable';

export default class Schematik {

  constructor() {
    // 'Magic Number' to enable quick checks whether an object is a Schematik
    // This one has to be enumerable so that we can use __proto__
    this.__schematik = true;

    // Immutable object for storing flags and schema state
    this.__flags  = Immutable({ });
    this.__schema = Immutable({ });
  }

  // Creates a copy of the Schematik object.
  // Since flags and schema are immutable, it is perfectly ok to just assign
  // them over without worrying about them being mutated after cloning.
  clone() {
    let copy = new Schematik();
    copy.__flags  = this.__flags;
    copy.__schema = this.__schema;
    return copy;
  }

  // Gets or sets a flag value.
  // If value is undefined, gets the flag value;
  // Otherwise, sets the flag to the value.
  flag(key, value) {

    if (typeof value === 'undefined') {
      return this.__flags[key];
    }

    let result = this.clone();
    result.__flags = this.__flags.merge({ [key]: value });

    return result;
  }

}
