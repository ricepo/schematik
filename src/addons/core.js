/**
 * Schematik core flags to be attached to the Schematik prototype.
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */

import Schematik        from '../schematik';
import { conjunctions } from '../config';

/**
* .required
*
* @desc             Returns a copy of the Schematik with `required` flag set
*                   to true.
*/
export function required() {
 return this.self().flag('required', true);
}

/**
 * .optional
 *
 * @desc            Returns a copy of the Schematik with `required` flag set
 *                  to false.
 */
export function optional() {
 return this.self().flag('required', false);
}

/**
 * .negate
 *
 * @desc            Sets the `negate` flag to true.
 */
export function negate() {
  return this.flag('negate', true);
}


/**
 * .of()
 *
 * @desc            Calls the last uninvoked function, passing it all arguments.
 */
export function of(...args) {
  let chain = this.flag('chain');
  if (chain) { return chain.apply(this, args); }
  return this;
}


/**
 * .whitelist()
 *
 * @desc            Specifies a set of acceptable values.
 */
export function whitelist(...args) {
  if (args.length === 0) {
    throw new Error('Must have at least one argument.');
  }

  let diff   = { enum: args };

  return this.self().schema(diff);
}


/**
 * .one()
 *
 * @desc            Specifies a match against exactly one of schemas.
 */
export function one(...args) {
  if (args.length === 0) {
    throw new Error('Must have at least one argument.');
  }

  let result = new Schematik();
  let diff   = {
    oneOf: args.map((i) => (i instanceof Schematik) ? i.done() : i)
  };

  return result.schema(diff);
}


/**
 * .all()
 *
 * @desc            Specifies a match against all of the schemas.
 */
export function all(...args) {
  if (args.length === 0) {
    throw new Error('Must have at least one argument.');
  }

  let result = new Schematik();
  let diff   = {
    allOf: args.map((i) => (i instanceof Schematik) ? i.done() : i)
  };

  return result.schema(diff);
}


/**
 * .any()
 *
 * @desc            Specifies a match against at least one of schemas.
 */
export function any(...args) {
  if (args.length === 0) {
    throw new Error('Must have at least one argument.');
  }

  let result = new Schematik();
  let diff   = {
    anyOf: args.map((i) => (i instanceof Schematik) ? i.done() : i)
  };

  return result.schema(diff);
}


/**
 * .not()
 *
 * @desc            Negates the match against a schema.
 */
export function not(schema) {
  if (typeof schema !== 'object') {
    throw new Error('Schema must be an object.');
  }

  let result = new Schematik();
  let diff   = { not: schema instanceof Schematik ? schema.done() : schema };

  return result.schema(diff);
}


/**
 * Export a middleware function.
 */
export default function core(Schematik, Util) {

  Util.addProperty(Schematik,            'required', required);
  Util.addProperty(Schematik.prototype,  'required', required);

  Util.addProperty(Schematik,            'optional', optional);
  Util.addProperty(Schematik.prototype,  'optional', optional);

  Util.addProperty(Schematik.prototype,  'not',      negate);
  Util.addProperty(Schematik.prototype,  'no',       negate);

  Util.addChainable(Schematik.prototype, 'of',       of);
  Util.addChainable(Schematik.prototype, 'enum',     whitelist);

  Schematik.enum = whitelist;
  Schematik.one = Schematik.oneOf = one;
  Schematik.all = Schematik.allOf = all;
  Schematik.any = Schematik.anyOf = any;
  Schematik.not = not;

  conjunctions.forEach((item) => {
    Util.addProperty(Schematik.prototype, item);
  });
}
