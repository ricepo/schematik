/**
 * Schematik `nullable` flag.
 *
 * @author          Denis Luchkin-Zhou <denis@ricepo.com>
 * @license         MIT
 */
import * as Symbols    from '../util/symbols';


/**
 * # .nullable
 *
 * #desc Sets the `nullable` flag to true.
 */
export function nullable() {
  return this.self().flag('nullable', true);
}


/**
 * Export a middleware function.
 */
export default function(context, util) {

  /* Attach nullable modifier to Schematik */
  util.addProperty(context,           'nullable', nullable);
  util.addProperty(context.prototype, 'nullable', nullable);

  /* Overwrite done() to support nullables */
  context.prototype.done = function() {
    let result = this[Symbols.schema].asMutable({ deep: true });

    /* Return as-is if not nullable */
    if (!this.flag('nullable')) { return result; }

    /* Otherwise, convert into a oneOf schems */
    result = context.oneOf(context.null(), result);
    result[Symbols.flags] = result[Symbols.flags].merge(this[Symbols.flags].without('nullable'));
    return result.done();
  };

}
