/**
 * Schematik.util.arrayConcat
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */

export default function arrayConcat(base, ...values) {

  if (base === undefined) { base = [ ]; }
  if (!Array.isArray(base)) { base = [base]; }

  base = base.concat(...values);

  return base;
}
