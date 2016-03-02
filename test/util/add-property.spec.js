/**
 * test/util/add-property.spec.js
 *
 * @author  Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license MIT
 */
const Schematik    = dofile('schematik');
const addProperty  = dofile('util/add-property');


describe('.addProperty()', function() {

  beforeEach(function() {
    this.obj  = new Schematik();
    this.get1 = Sinon.spy(() => 42);
    this.get2 = Sinon.spy();
    addProperty(this.obj, 'test1', this.get1);
    addProperty(this.obj, 'test2', this.get2);
  });

  it('should add a property to the context', function() {
    expect(this.obj.test1)
      .to.be.a('number')
      .to.equal(42);
  });

  it('should invoke {get} when accessed', function() {
    this.obj.test1;
    expect(this.get1)
      .to.be.calledOnce;
  });

  it('should return {this} when {get} returns nothing', function() {
    expect(this.obj.test2)
      .to.be.an.instanceof(Schematik);
  });

  it('should default to noop when {get} is undefined', function() {
    addProperty(this.obj, 'test3');
    expect(this.obj.test3)
      .to.be.an.instanceof(Schematik);
  });

});
