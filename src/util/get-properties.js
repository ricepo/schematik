// -------------------------------------------------------------------------- //
//                                                                            //
// Gets all properties of an object, including those of its prototypes.       //
//                                                                            //
// -------------------------------------------------------------------------- //

// This file is an ES6 rewrite of:
//   chaijs/chai/lib/chai/utils/getProperties.js

export default function getProperties(object) {
  let result = Object.getOwnPropertyNames(object);

  let push = (prop) => {
    if (result.indexOf(prop) < 0) { result.push(prop); }
  };

  let prorto = Object.getPrototypeOf(object);
  while (proto !== null) {
    Object.getOwnPropertyNames(proto).forEach(push);
    proto = Object.getPrototypeOf(proto);
  }

  return result;
}
