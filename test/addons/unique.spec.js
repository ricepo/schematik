/**
 * test/addons/additional.spec.js
 *
 * @author  Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license MIT
 */
const Schematik    = dofile('index');


describe('.unique', function() {

  beforeEach(function() { this.obj = Schematik.array(); });

  it('should add the .unique property', function() {
    expect(this.obj.unique).to.be.an.instanceof(Schematik);
  });

  it('should set `uniqueItems` schema value', function() {
    expect(this.obj.unique.schema('uniqueItems')).to.equal(true);
  });

});
