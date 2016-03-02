/**
 * test/addons/additional.spec.js
 *
 * @author  Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license MIT
 */
const Schematik    = dofile('index');


describe('.additional', function() {

  beforeEach(function() { this.obj = Schematik.object(); });

  it('should add all aliased properties', function() {
    expect(this.obj)
      .to.have.property('more');
    expect(this.obj)
      .to.have.property('additional');
    expect(this.obj.more)
      .to.be.an.instanceof(Schematik);
    expect(this.obj.additional)
      .to.be.an.instanceof(Schematik);
  });

  it('should add the `additional` flag when accessed', function() {
    this.other = this.obj.more;
    expect(this.other.flag('additional')).to.equal(true);
    expect(this.obj.flag('additional')).to.equal(undefined);
  });

});
