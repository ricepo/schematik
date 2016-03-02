/**
 * Schematik.util.isSchematik
 *
 * @author          Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license         MIT
 */


function isSchematik(object) {
  return (typeof object.done === 'function');
}
module.exports = isSchematik;
