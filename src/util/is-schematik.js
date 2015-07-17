// -------------------------------------------------------------------------- //
//                                                                            //
// Checks whether an object is a Schematik.                                   //
//                                                                            //
// -------------------------------------------------------------------------- //
import Schematik    from '../types/core';

export default function isSchematik(object) {
  return object instanceof Schematik;
}