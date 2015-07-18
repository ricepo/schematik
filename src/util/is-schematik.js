// -------------------------------------------------------------------------- //
//                                                                            //
// Checks whether an object is a Schematik.                                   //
//                                                                            //
// -------------------------------------------------------------------------- //
import Schematik    from '../schematik';

export default function isSchematik(object) {
  return object instanceof Schematik;
}
