/**
 * test/util/is-schematik.spec.js
 *
 * @author  Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license MIT
 */
const Schematik    = dofile('schematik');
const isSchematik  = dofile('util/is-schematik');


describe('.instantiate()', function() {

  beforeEach(function() {
    this.obj = new Schematik();
  });

  it('should return true when argument is a Schematik', function() {
    expect(isSchematik(this.obj))
      .to.equal(true);
  });

  it('should return false when argument is not a Schematik', function() {
    expect(isSchematik({ }))
      .to.equal(false);
  });

});
