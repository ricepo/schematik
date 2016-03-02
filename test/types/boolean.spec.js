/**
 * test/types/boolean.spec.js
 *
 * @author  Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license MIT
 */
const Schematik    = dofile('index');


describe('.Boolean', function() {

  describe('.constructor()', function() {

    it('should be created using constructor', function() {
      const obj = new Schematik.Boolean();
      expect(obj).to.be.an.instanceof(Schematik.Boolean);
    });

    it('should be created using shorthand', function() {
      const obj = Schematik.boolean();
      expect(obj).to.be.an.instanceof(Schematik.Boolean);
    });

  });

});
