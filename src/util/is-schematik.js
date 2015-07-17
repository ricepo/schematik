// -------------------------------------------------------------------------- //
//                                                                            //
// Checks whether an object is a Schematik.                                   //
//                                                                            //
// -------------------------------------------------------------------------- //
import magic        from './symbols';

export default function isSchematik(object) {
  return !!object[magic];
}
