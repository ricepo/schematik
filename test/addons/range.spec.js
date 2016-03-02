/**
 * test/addons/additional.spec.js
 *
 * @author  Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license MIT
 */
const Schematik    = dofile('index');


describe('.min', function() {

  beforeEach(function() { this.obj = Schematik.string(); });

  it('should add the .min property', function() {
    expect(this.obj.min).to.be.an.instanceof(Schematik);
  });

  it('should add the `range` flag', function() {
    expect(this.obj.min.flag('range')).to.equal('min');
  });

});

describe('.max', function() {

  beforeEach(function() { this.obj = Schematik.string(); });

  it('should add the .max property', function() {
    expect(this.obj.max).to.be.an.instanceof(Schematik);
  });

  it('should add the `range` flag', function() {
    expect(this.obj.max.flag('range')).to.equal('max');
  });

});
