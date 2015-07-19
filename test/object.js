chai      = require('chai');
expect    = chai.expect;
Schematik = require('../lib');

describe.only('Schematik.Object', function() {

  describe('#ctor()', function() {

    it('should be created in object oriented way', function() {
      var s = new Schematik.Object().done();
      expect(s).to.deep.equal({ type: 'object' });
    });

    it('should be created in functional way', function() {
      var s = Schematik.object().done();
      expect(s).to.deep.equal({ type: 'object' });
    });

  });

  describe('#clone()', function() {

    it('should not affect cloned instances', function() {
      var a = Schematik.object().property('test', Schematik.number());
      var b = a.clone().max.count(100);

      expect(a.done()).to.deep.equal({
        type: 'object',
        properties: {
          test: { type: 'number' }
        },
        required: ['test']
      });

      expect(b.done()).to.deep.equal({
        type: 'object',
        maxProperties: 100,
        properties: {
          test: { type: 'number' }
        },
        required: ['test']
      });

    });

  });

  describe('modifiers', function() {

    it('should work with {optional} modifier', function() {
      var s = Schematik.optional.object();
      expect(s.flag('required')).to.equal(false);
    });

    it('should work with {required} modifier', function() {
      var s = Schematik.optional.object();
      expect(s.flag('required')).to.equal(false);
      s = s.required;
      expect(s.flag('required')).to.equal(true);
    });

    it('should have {min} modifier set the flag', function() {
      var s = Schematik.object().min;
      expect(s.flag('range')).to.equal('min');
    });

    it('should have {max} modifier set the flag', function() {
      var s = Schematik.object().max;
      expect(s.flag('range')).to.equal('max');
    });

    it('should have {additional} modifier set the flag', function() {
      var s = Schematik.object().additional;
      expect(s.flag('additional')).to.equal(true);
    });

    it('should have {pattern} modifier set the flag', function() {
      var s = Schematik.object().pattern;
      expect(s.flag('pattern')).to.equal(true);
    });

    it('should have {no} modifier set the flag', function() {
      var s = Schematik.object().no;
      expect(s.flag('negate')).to.equal('true');
    });

  });

  describe('#count()', function() {

    it('should set minimum property count with {min} modifier', function() {
      var s = Schematik.object().min.count(99);
      expect(s.done()).to.deep.equal({
        type: 'object',
        minProperties: 99
      });
    });

    it('should set maximum length with {max} modifier', function() {
      var s = Schematik.object().max.count(99);
      expect(s.done()).to.deep.equal({
        type: 'object',
        maxProperties: 99
      });
    });

    it('should set minimum and maximum lengths with two arguments', function() {
      var s = Schematik.object().count(9, 99);
      expect(s.done()).to.deep.equal({
        type: 'object',
        minProperties: 9,
        maxProperties: 99
      });
    });

    it('should set minimum and maximum lengths with one argument', function() {
      var s = Schematik.object().count(9);
      expect(s.done()).to.deep.equal({
        type: 'object',
        minProperties: 9,
        maxProperties: 9
      });
    });

    it('should throw when first argument is not a number', function() {
      expect(function() { Schematik.object().count('test'); }).to.throw();
    });

    it('should ignore the second argument if it is not a number', function() {
      var s = Schematik.object().count(9, 'test');
      expect(s.done()).to.deep.equal({
        type: 'object',
        minProperties: 9,
        maxProperties: 9
      });
    });

  });

  describe('#property()', function() {

    describe('with no modifiers', function() {

      it('should add a property to the schema', function() {
        var s = Schematik.object().with.property('test', Schematik.string());
        expect(s.done()).to.deep.equal({
          type: 'object',
          properties: {
            test: { type: 'string' }
          },
          required: ['test']
        });
        s = s.with.property('foo', { type: 'bar' });
        expect(s.done()).to.deep.equal({
          type: 'object',
          properties: {
            test: { type: 'string' },
            foo:  { type: 'bar' }
          },
          required: ['test']
        });
      });

      it('should throw if key or value is of invalid type', function() {
        expect(function() {
          Schematik.object().property(1, { });
        }).to.throw();
        expect(function() {
          Schematik.object().property('test', 1);
        }).to.throw();
      });

      it('should throw when attempting to overwrite a property', function() {
        var s = Schematik.object().with.property('test', Schematik.string());
        expect(s.done()).to.deep.equal({
          type: 'object',
          properties: {
            test: { type: 'string' }
          },
          required: ['test']
        });
        expect(function() {
          s.property('test', Schematik.number());
        }).to.throw();
      });

    });

    describe('with {additional} modifier', function() {

      it('should set the additional property', function() {
        var s = Schematik.object().additional.property(Schematik.string());
        expect(s.done()).to.deep.equal({
          type: 'object',
          additionalProperties: {
            type: 'string'
          }
        });
        var a = Schematik.object().additional.property(true);
        expect(a.done()).to.deep.equal({
          type: 'object',
          additionalProperties: true
        });
      });

      it('should pick default when there is no parameter', function() {
        var s = Schematik.object().additional.property();
        expect(s.done()).to.deep.equal({
          type: 'object',
          additionalProperties: true
        });
        var a = Schematik.object().no.additional.property();
        expect(a.done()).to.deep.equal({
          type: 'object',
          additionalProperties: false
        });
      });

      it('should throw if argument is not a boolean or object', function() {
        expect(function() {
          Schematik.object().additional.property(1);
        }).to.throw();
      });

      it('should throw when attempting to overwrite', function() {
        expect(function() {
          Schematik.object().additional.property(Schematik.string()).additional.property(false);
        }).to.throw();
      });

    });

    describe('with {pattern} modifier', function() {

      it('should add a pattern property to the schema', function() {
        var s = Schematik.object().pattern.property(/\d+/, Schematik.string());
        expect(s.done()).to.deep.equal({
          type: 'object',
          patternProperties: {
            '\\d+': {
              type: 'string'
            }
          }
        });
        s = s.with.pattern.property(/[0-9]+/, { type: 'bar' });
        expect(s.done()).to.deep.equal({
          type: 'object',
          patternProperties: {
            '\\d+': {
              type: 'string'
            },
            '[0-9]+': {
              type: 'bar'
            }
          }
        });
      });

      it('should throw when key is not a regex', function() {
        expect(function() {
          Schematik.object().pattern.property(123, Schematik.string());
        }).to.throw();
      });

      it('should throw when value is not an object', function() {
        expect(function() {
          Schematik.object().pattern.property(/[0-9]+/, 123);
        }).to.throw();
      });

      it('should throw when attempting to overwrite an existing property', function() {
        expect(function() {
          Schematik.object()
          .pattern.property(/[0-9]+/, Schematik.string())
          .pattern.property(/[0-9]+/, Schematik.number());
        }).to.throw();
      });

    });

  });

  describe('#properties()', function() {

    describe('with no modifiers', function() {

      it('should add properties to the schema', function() {
        var s = Schematik.object().with.properties({
          test: Schematik.string(),
          foo: { type: 'bar' }
        });
        expect(s.done()).to.deep.equal({
          type: 'object',
          properties: {
            test: { type: 'string' },
            foo:  { type: 'bar' }
          },
          required: ['test']
        });
      });

      it('should throw if the argument is not an object', function() {
        expect(function() {
          Schematik.object().with.properties(123);
        }).to.throw();
      });

    });

    describe('with {pattern} modifier', function() {

      it('should add a pattern property to the schema', function() {
        var s = Schematik.object().pattern.properties({
          '\\d+': Schematik.string(),
          '[0-9]+': { type: 'bar' }
        });
        expect(s.done()).to.deep.equal({
          type: 'object',
          patternProperties: {
            '\\d+':   { type: 'string' },
            '[0-9]+': { type: 'bar' }
          }
        });

      });

    });

    describe('with {additional} modifier', function() {

      it('should set additional properties to true if {no} is not present', function() {
        var s = Schematik.object().with.additional.properties();
        expect(s.done()).to.deep.equal({
          additionalProperties: true,
          type: 'object'
        });
      });

      it('should set additional properties to false if {no} is not present', function() {
        var s = Schematik.object().with.no.additional.properties();
        expect(s.done()).to.deep.equal({
          additionalProperties: false,
          type: 'object'
        });
      });

      it('should throw if an argument is supplied', function() {
        expect(function() {
          Schematik.object().with.additional.properties(Schematik.string());
        }).to.throw();
      });

    });

  });
});
