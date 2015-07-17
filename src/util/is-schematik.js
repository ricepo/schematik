// -------------------------------------------------------------------------- //
//                                                                            //
// Checks whether an object is a Schematik.                                   //
//                                                                            //
// -------------------------------------------------------------------------- //

// Symbol for accessing the magic number property
const __schematik = Symbol.for('Schematik.schematik');

export default function isSchematik(object) {
  return !!object[__schematik];
}
