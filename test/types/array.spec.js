/**
 * test/types/array.spec.js
 *
 * @author  Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license MIT
 */
const Schematik    = dofile('index');


describe('.Array', function() {

  describe('.constructor()', function() {

    it('should be created using constructor', function() {
      const obj = new Schematik.Array();
      expect(obj)
        .to.be.an.instanceof(Schematik.Array);
    });

    it('should be created using shorthand', function() {
      const obj = Schematik.array();
      expect(obj)
        .to.be.an.instanceof(Schematik.Array);
    });

  });

  describe('.done()', function() {

    it('should output the correct schema', function() {
      const obj = Schematik.array().schema({ foo: 'bar' });
      expect(obj.done())
        .to.deep.equal({
          type: 'array',
          foo:  'bar'
        });
    });

    it('should honor the `unique` flag', function() {
      const obj1 = Schematik.unique.array().schema({ foo: 'bar' });
      const obj2 = Schematik.array().unique.schema({ foo: 'bar' });
      const res  = {
        type: 'array',
        foo:  'bar',
        uniqueItems: true
      };
      expect(obj1.done())
        .to.deep.equal(res);
      expect(obj2.done())
        .to.deep.equal(res);
    });

  });

  describe('.length()', function() {

    it('should set minimum item count', function() {
      const schema = Schematik.array().min.length(20).done();
      expect(schema)
        .to.have.property('minItems', 20);
      expect(schema)
        .not.to.have.property('maxItems');
    });

    it('should set maximum item count', function() {
      const schema = Schematik.array().max.length(20).done();
      expect(schema)
        .to.have.property('maxItems', 20);
      expect(schema)
        .not.to.have.property('minItems');
    });

    it('should set item count range when called with 2 arguments', function() {
      const schema = Schematik.array().length(20, 42).done();
      expect(schema)
        .to.have.property('minItems', 20);
      expect(schema)
        .to.have.property('maxItems', 42);
    });

    it('should set item count when called with 1 argument', function() {
      const schema = Schematik.array().length(42).done();
      expect(schema)
        .to.have.property('minItems', 42);
      expect(schema)
        .to.have.property('maxItems', 42);
    });

    it('should throw when the first argument is not a number', function() {
      expect(function() {
        Schematik.array().length();
      }).to.throw('length must be a number.');
    });

  });

  describe('.items()', function() {

    it('should set the item schemas with no flags', function() {
      const obj = Schematik.array().items({ foo: 'bar' }, new Schematik());
      const schema = obj.done();
      expect(schema).to.deep.equal({
        type: 'array',
        items: [ { foo: 'bar' }, { } ]
      });
    });

    it('should append to schema items if they already exist', function() {
      let obj = Schematik.array().items({ foo: 'bar' });
      expect(obj.done()).to.deep.equal({
        type: 'array',
        items: { foo: 'bar' }
      });
      obj = obj.items(new Schematik());
      expect(obj.done()).to.deep.equal({
        type: 'array',
        items: [ { foo: 'bar' }, { } ]
      });
    });

    it('should throw when no arguments are provided', function() {
      expect(function() {
        Schematik.array().items();
      }).to.throw('need at least one argument.');
    });

    it('should set additional items schema with `additional` flag', function() {
      let obj = Schematik.array().more.items({ foo: 'bar' });
      expect(obj.done()).to.deep.equal({
        type: 'array',
        additionalItems: { foo: 'bar' }
      });
      obj = obj.more.items(new Schematik());
      expect(obj.done()).to.deep.equal({
        type: 'array',
        additionalItems: { }
      });
    });

    it('should set additional items to false with `not` flag', function() {
      const obj = Schematik.array().no.more.items();
      expect(obj.done()).to.deep.equal({
        type: 'array',
        additionalItems: false
      });
    });

    it('should throw when additional item schema is invalid', function() {
      expect(function() {
        Schematik.array().more.items(42);
      }).to.throw('value must be object or bool.');
    });

  });

});
