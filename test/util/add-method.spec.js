/**
 * test/util/add-method.spec.js
 *
 * @author  Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license MIT
 */
const Schematik    = dofile('schematik');
const addMethod    = dofile('util/add-method');


describe('.addMethod()', function() {

  beforeEach(function() {
    this.obj  = new Schematik();
    this.call = Sinon.spy(a => a);
    addMethod(this.obj, 'test', this.call);
  });

  it('should add a method to the context', function() {
    expect(this.obj.test)
      .to.be.a('function');
    expect(this.obj.test(42))
      .to.equal(42);
  });

  it('should invoke {call} when called', function() {
    this.obj.test();
    expect(this.call)
      .to.be.calledOnce;
  });

  it('should not be chainable', function() {
    expect(this.obj.test)
      .not.to.be.an.instanceof(Schematik);
  });

  it('should return {this} when {call} returns nothing', function() {
    expect(this.obj.test())
      .to.be.an.instanceof(Schematik);
  });

});
