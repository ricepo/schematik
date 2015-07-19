chai      = require('chai');
expect    = chai.expect;
Schematik = require('../lib').dev();

describe('Schematik Base', function() {

  describe('Error Checks', function() {

    it.skip('should prevent type overwrites', function() {
      expect(function() { Schematik.string().number(); }).to.throw();
    });

  });

  describe('#clone()', function() {

    it('should not affect cloned instances', function() {
      var a = new Schematik();
      var b = a.clone().optional;

      expect(a).to.have.deep.property('@@flags.required', true);
      expect(b).to.have.deep.property('@@flags.required', false);
    });

  });

  describe('#enum()', function() {

    it('should create an enum constraint', function() {
      var s = Schematik.string().enum('a', 'b', 'c');
      expect(s.done()).to.deep.equal({
        type: 'string',
        enum: ['a', 'b', 'c']
      });
    });

    it('should throw if no arguments are provided', function() {
      expect(function() { Schematik.string().enum(); }).to.throw();
    });

    it.skip('should throw if there is a function among arguments', function() {
      expect(function() {
        Schematik.string().enum('a', function() { }, 'b');
      }).to.throw();
    });

  });

  describe('#oneOf()', function() {

    it('should create a schema with oneOf constraint', function() {
      var s = Schematik.oneOf(Schematik.string(), Schematik.number());
      expect(s.done()).to.deep.equal({
        oneOf: [{ type: 'string' }, { type: 'number' }]
      });
    });

    it('should throw when no arguments are provided', function() {
      expect(function() { Schematik.oneOf(); }).to.throw();
    });

  });

  describe('#allOf()', function() {

    it('should create a schema with allOf constraint', function() {
      var s = Schematik.allOf(Schematik.string(), Schematik.number());
      expect(s.done()).to.deep.equal({
        allOf: [{ type: 'string' }, { type: 'number' }]
      });
    });

    it('should throw when no arguments are provided', function() {
      expect(function() { Schematik.allOf(); }).to.throw();
    });

  });

  describe('#anyOf()', function() {

    it('should create a schema with anyOf constraint', function() {
      var s = Schematik.anyOf(Schematik.string(), Schematik.number());
      expect(s.done()).to.deep.equal({
        anyOf: [{ type: 'string' }, { type: 'number' }]
      });
    });

    it('should.throw when no arguments are provided', function() {
      expect(function() { Schematik.anyOf(); }).to.throw();
    });

  });

  describe('#not()', function() {

    it('should create a schema with not constraint', function() {
      var s = Schematik.not(Schematik.string());
      expect(s.done()).to.deep.equal({ not: { type: 'string' } });
    });

    it('should throw when no arguments are provided', function() {
      expect(function() { Schematik.not(); }).to.throw();
    });

  });

  describe.skip('#define()', function() {

    it('should add a schema definition', function() {
      var s = Schematik.string().define('test', Schematik.number());
      expect(s.done()).to.deep.equal({
        type: 'string',
        definitions: {
          test: { type: 'number' }
        }
      });
      s.define('foo', { type: 'bar' });
      expect(s.done()).to.deep.equal({
        type: 'string',
        definitions: {
          test: { type: 'number' },
          foo:  { type: 'bar'    }
        }
      });
    });

    it('should throw if name is not a string', function() {
      expect(function() { Schematik.string().define(1, { }); }).to.throw();
    });

    it('should throw if schema is not an object or Schematik', function() {
      expect(function() { Schematik.string().define('test', 1); }).to.throw();
    });

    it('should throw when attempting to overwrite', function() {
      expect(function() {
        Schematik.number().define('test', { }).define('test', { });
      }).to.throw();
    });

  });

  describe.skip('#ref()', function() {

    it('should create a $ref schema', function() {
      var s = Schematik.ref('#/definitions/test');
      expect(s.done()).to.deep.equal({ $ref: '#/definitions/test' });
    });

    it('should throw if path is not a string', function() {
      expect(function() { Schematik.ref(123); }).to.throw();
    });

  });

});
