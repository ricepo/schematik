/**
 * Schematik core flags to be attached to the Schematik prototype.
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.required = required;
exports.optional = optional;
exports.negate = negate;
exports.of = of;
exports.whitelist = whitelist;
exports.one = one;
exports.all = all;
exports.any = any;
exports.not = not;
exports['default'] = core;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _schematik = require('../schematik');

var _schematik2 = _interopRequireDefault(_schematik);

var _config = require('../config');

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

function of() {
  var chain = this.flag('chain');
  if (chain) {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return chain.apply(this, args);
  }
  return this;
}

/**
 * .whitelist()
 *
 * @desc            Specifies a set of acceptable values.
 */

function whitelist() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  if (args.length === 0) {
    throw new Error('Must have at least one argument.');
  }

  var diff = { 'enum': args };

  return this.self().schema(diff);
}

/**
 * .one()
 *
 * @desc            Specifies a match against exactly one of schemas.
 */

function one() {
  for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  if (args.length === 0) {
    throw new Error('Must have at least one argument.');
  }

  var result = new _schematik2['default']();
  var diff = {
    oneOf: args.map(function (i) {
      return i instanceof _schematik2['default'] ? i.done() : i;
    })
  };

  return result.schema(diff);
}

/**
 * .all()
 *
 * @desc            Specifies a match against all of the schemas.
 */

function all() {
  for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    args[_key4] = arguments[_key4];
  }

  if (args.length === 0) {
    throw new Error('Must have at least one argument.');
  }

  var result = new _schematik2['default']();
  var diff = {
    allOf: args.map(function (i) {
      return i instanceof _schematik2['default'] ? i.done() : i;
    })
  };

  return result.schema(diff);
}

/**
 * .any()
 *
 * @desc            Specifies a match against at least one of schemas.
 */

function any() {
  for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    args[_key5] = arguments[_key5];
  }

  if (args.length === 0) {
    throw new Error('Must have at least one argument.');
  }

  var result = new _schematik2['default']();
  var diff = {
    anyOf: args.map(function (i) {
      return i instanceof _schematik2['default'] ? i.done() : i;
    })
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

  var result = new _schematik2['default']();
  var diff = { not: schema instanceof _schematik2['default'] ? schema.done() : schema };

  return result.schema(diff);
}

/**
 * Export a middleware function.
 */

function core(schematik, Util) {

  Util.addProperty(schematik, 'required', required);
  Util.addProperty(schematik.prototype, 'required', required);

  Util.addProperty(schematik, 'optional', optional);
  Util.addProperty(schematik.prototype, 'optional', optional);

  Util.addProperty(schematik.prototype, 'not', negate);
  Util.addProperty(schematik.prototype, 'no', negate);

  Util.addChainable(schematik.prototype, 'of', of);
  Util.addChainable(schematik.prototype, 'enum', whitelist);

  schematik['enum'] = whitelist;
  schematik.one = schematik.oneOf = one;
  schematik.all = schematik.allOf = all;
  schematik.any = schematik.anyOf = any;
  schematik.not = not;

  _config.conjunctions.forEach(function (item) {
    Util.addProperty(schematik.prototype, item);
  });
}
//# sourceMappingURL=../addons/core.js.map