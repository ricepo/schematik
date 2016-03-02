/**
 * Schematik core flags to be attached to the Schematik prototype.
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */

const Schematik    = require('../schematik');
const conjunctions = require('../config').conjunctions;

/**
* .required
*
* @desc             Returns a copy of the Schematik with `required` flag set
*                   to true.
*/
function required() {
  return this.self().flag('required', true);
}

/**
 * .optional
 *
 * @desc            Returns a copy of the Schematik with `required` flag set
 *                  to false.
 */
function optional() {
  return this.self().flag('required', false);
}

/**
 * .negate
 *
 * @desc            Sets the `negate` flag to true.
 */
function negate() {
  return this.flag('negate', true);
}


/**
 * .of()
 *
 * @desc            Calls the last uninvoked function, passing it all arguments.
 */
function of(...args) {
  const chain = this.flag('chain');
  if (chain) { return chain.apply(this, args); }
  return this;
}


/**
 * .whitelist()
 *
 * @desc            Specifies a set of acceptable values.
 */
function whitelist(...args) {
  if (args.length === 0) {
    throw new Error('Must have at least one argument.');
  }

  const diff = { enum: args };

  return this.self().schema(diff);
}


/**
 * .one()
 *
 * @desc            Specifies a match against exactly one of schemas.
 */
function one(...args) {
  if (args.length === 0) {
    throw new Error('Must have at least one argument.');
  }

  const result = new Schematik();
  const diff   = {
    oneOf: args.map((i) => (i instanceof Schematik) ? i.done() : i)
  };

  return result.schema(diff);
}


/**
 * .all()
 *
 * @desc            Specifies a match against all of the schemas.
 */
function all(...args) {
  if (args.length === 0) {
    throw new Error('Must have at least one argument.');
  }

  const result = new Schematik();
  const diff   = {
    allOf: args.map((i) => (i instanceof Schematik) ? i.done() : i)
  };

  return result.schema(diff);
}


/**
 * .any()
 *
 * @desc            Specifies a match against at least one of schemas.
 */
function any(...args) {
  if (args.length === 0) {
    throw new Error('Must have at least one argument.');
  }

  const result = new Schematik();
  const diff   = {
    anyOf: args.map((i) => (i instanceof Schematik) ? i.done() : i)
  };

  return result.schema(diff);
}


/**
 * .not()
 *
 * @desc            Negates the match against a schema.
 */
function not(schema) {
  if (typeof schema !== 'object') {
    throw new Error('Schema must be an object.');
  }

  const result = new Schematik();
  const diff   = { not: schema instanceof Schematik ? schema.done() : schema };

  return result.schema(diff);
}


/**
 * Export a middleware function.
 */
module.exports = function core(schematik, Util) {

  Util.addProperty(schematik,            'required', required);
  Util.addProperty(schematik.prototype,  'required', required);

  Util.addProperty(schematik,            'optional', optional);
  Util.addProperty(schematik.prototype,  'optional', optional);

  Util.addProperty(schematik.prototype,  'not',      negate);
  Util.addProperty(schematik.prototype,  'no',       negate);

  Util.addChainable(schematik.prototype, 'of',       of);
  Util.addChainable(schematik.prototype, 'enum',     whitelist);

  schematik.enum = whitelist;
  schematik.one = schematik.oneOf = one;
  schematik.all = schematik.allOf = all;
  schematik.any = schematik.anyOf = any;
  schematik.not = not;

  conjunctions.forEach((item) => {
    Util.addProperty(schematik.prototype, item);
  });
};
module.exports.whitelist = whitelist;
module.exports.required = required;
module.exports.optional = optional;
module.exports.negate = negate;
module.exports.one = one;
module.exports.all = all;
module.exports.any = any;
module.exports.not = not;
module.exports.of = of;
