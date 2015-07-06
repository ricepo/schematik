// ------------------------------------------------------------------------- //
//                                                                           //
// Schematik base class.                                                     //
//                                                                           //
// ------------------------------------------------------------------------- //
import Immutable from 'immutable';

export default class Schematik {

  constructor(options) {

    // Used to check whether an object is a Schematik, since
    // inheritance chains might get broken in the process.
    this.__schematik = true;

    // Initialize the Schematik instance
    this._init(options);

  }

  // Returns the corresponding JSON schema
  done() {
    
  }

  // Gets/sets a flag on the Schematik instance.
  flag(name, value) {
    if (typeof name !== 'string') {
      throw new Error('name must be a string.');
    }
    if (typeof value !== 'undefined') {
      let clone = new Schematik(this);
      clone._flags  = this._flags.set(name, value);
      return clone;
    } else {
      return this._flags.has(name) ? this._flags.get(name) : null;
    }
  }

  // Gets/sets the type of the Schematik instance.
  type(type) {
    if (!type) { type = 'any'; }
    let clone = new Schematik(this);
    clone._schema = this._schema.set('type', type);
    return clone;
  }

  // Initializes the Schematik instance from options.
  _init(options) {
    if (!options) {
      this._flags  = new Immutable.Map({ required: true });
      this._schema = new Immutable.Map({ type: 'any' });
      return;
    }
    // Clone the Schematik if one is provided
    if (options.__schematik) {
      this._flags  = options._flags;
      this._schema = options._schema;
      return;
    }
    // Convert the plain schema into Schematik
    if (_.isObject(options)) {

    }
  }

}
