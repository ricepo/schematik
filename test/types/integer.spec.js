/**
 * test/types/integer.spec.js
 *
 * @author  Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license MIT
 */
const Schematik    = dofile('index');


describe('.Integer', function() {

  describe('.constructor()', function() {

    it('should be created using constructor', function() {
      const obj = new Schematik.Integer();
      expect(obj).to.be.an.instanceof(Schematik.Integer);
      expect(obj.schema('type')).to.equal('integer');
    });

    it('should be created using shorthand', function() {
      const obj = Schematik.integer();
      expect(obj).to.be.an.instanceof(Schematik.Integer);
      expect(obj.schema('type')).to.equal('integer');
    });

  });

});
