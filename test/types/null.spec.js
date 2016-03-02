/**
 * test/types/null.spec.js
 *
 * @author  Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license MIT
 */
const Schematik    = dofile('index');


describe('.Null', function() {

  describe('.constructor()', function() {

    it('should be created using constructor', function() {
      const obj = new Schematik.Null();
      expect(obj).to.be.an.instanceof(Schematik.Null);
    });

    it('should be created using shorthand', function() {
      const obj = Schematik.null();
      expect(obj).to.be.an.instanceof(Schematik.Null);
    });

  });

});
