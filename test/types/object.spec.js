
/* eslint-env mocha */

const expect         = require('chai').expect;
const load           = require('../loader.js');
const Schematik      = load('index.js');

describe('.Object', function() {

  describe('.constructor()', function() {

    it('should be created using constructor', function() {
      const obj = new Schematik.Object();
      expect(obj).to.be.an.instanceof(Schematik.Object);
    });

    it('should be created using shorthand', function() {
      const obj = Schematik.object();
      expect(obj).to.be.an.instanceof(Schematik.Object);
    });

  });

  describe('.pattern', function() {

    it('should add the chainable property', function() {
      const obj = Schematik.object();
      expect(obj.pattern).to.be.an.instanceof(Schematik.Object);
    });

    it('should set the `pattern` flag', function() {
      const obj = Schematik.object().pattern;
      expect(obj.flag('pattern')).to.equal(true);
    });

  });

  describe('.count()', function() {

    it('should set the minimum count if `min` flag', function() {
      const obj = Schematik.object().min.count(42);
      expect(obj.done()).to.have.property('minProperties', 42);
    });

    it('should set the maximum count if `max` flag', function() {
      const obj = Schematik.object().max.count(42);
      expect(obj.done()).to.have.property('maxProperties', 42);
    });

    it('should set both min and max count if called with 2 args', function() {
      const obj = Schematik.object().count(41, 42);
      expect(obj.done()).to.have.property('minProperties', 41);
      expect(obj.done()).to.have.property('maxProperties', 42);
    });

    it('should set both min and max count if called with 1 args', function() {
      const obj = Schematik.object().count(42);
      expect(obj.done()).to.have.property('minProperties', 42);
      expect(obj.done()).to.have.property('maxProperties', 42);
    });

    it('should throw if min is greater than max', function() {
      const obj = Schematik.object().schema({ maxProperties: 0 });
      expect(function() {
        obj.min.count(42);
      }).to.throw('{min} cannot be greater than {max}');
    });

    it('should throw if max is less than min', function() {
      const obj = Schematik.object().schema({ minProperties: 42 });
      expect(function() {
        obj.max.count(0);
      }).to.throw('{max} cannot be less than {min}');
    });

    it('should throw if max is less than min (2 args)', function() {
      expect(function() {
        Schematik.object().count(42, 0);
      }).to.throw('{min} cannot be greater than {max}');
    });

    it('should throw if called with a non-number argument', function() {
      expect(function() {
        Schematik.object().count('test');
      }).to.throw('Count value must be a number.');
    });

  });

  describe('.property()', function() {

    describe('with no flags', function() {

      it('should add an object property to the schematik', function() {
        const obj = Schematik.object().property('test', Schematik.string());
        expect(obj.done()).to.deep.equal({
          type: 'object',
          additionalProperties: true,
          properties: { test: { type: 'string' } },
          required: ['test']
        });
      });

      it('should add an schematik property', function() {
        const obj = Schematik.object().property('test', { foo: 'bar' });
        expect(obj.done().properties).to.deep.equal({
          test: { foo: 'bar' }
        });
      });

      it('should recognize required properties', function() {
        const obj = Schematik.object()
          .property('test1', Schematik.string())
          .property('test2', Schematik.optional.string());
        expect(obj.done()).to.deep.equal({
          type: 'object',
          additionalProperties: true,
          properties: {
            test1: { type: 'string' },
            test2: { type: 'string' }
          },
          required: [ 'test1' ]
        });
      });

      it('should throw if key is not a string', function() {
        expect(function() {
          Schematik.object().property(123, { });
        }).to.throw('Key must be a string.');
      });

      it('should throw on attempt to overwrite', function() {
        const value = Schematik.object().property('test', Schematik.string());

        expect(function() {
          value.property('test', { foo: 'bar' });
        }).to.throw('Cannot overwrite property: test');
      });

      it('should throw if schema is not an object', function() {
        expect(function() {
          Schematik.object().property(123);
        }).to.throw('Schema must be an object.');
      });

    });

    describe('with `pattern` flag', function() {

      it('should add a pattern property', function() {
        const value = Schematik.object()
          .pattern.property(/[0-9]/, Schematik.string());

        expect(value.done()).to.deep.equal({
          type: 'object',
          additionalProperties: true,
          patternProperties: {
            '[0-9]': { type: 'string' }
          }
        });
      });

      it('should throw if key is not a regex', function() {
        expect(function() {
          Schematik.object().pattern.property(123, { });
        }).to.throw('Key must be a RegExp.');
      });

      it('should throw on attempt to overwrite', function() {
        const value = Schematik.object()
          .pattern.property(/[0-9]/, Schematik.string());

        expect(function() {
          value.pattern.property(/[0-9]/, { });
        }).to.throw('Cannot overwrite pattern property: [0-9]');
      });

    });

    describe('with `additional` flag', function() {

      it('should set additional properties value', function() {
        const value = Schematik.object().additional.property(false);
        expect(value.done()).to.have.property('additionalProperties', false);
      });

      it('should accept Schematik instance', function() {
        const value = Schematik.object()
          .additional.property(Schematik.string());
        expect(value.done()).to.have.property('additionalProperties');
        expect(value.done().additionalProperties)
          .to.deep.equal({ type: 'string' });
      });

      it('should throw when attempting to overwrite', function() {
        const value = Schematik.object().additional.property(false);

        expect(function() {
          value.additional.property(true);
        }).to.throw('Cannot overwrite additional properties.');

      });

      it('should check `negate` flag with no args', function() {
        const value = Schematik.object().no.additional.property();
        expect(value.done()).to.have.property('additionalProperties', false);
      });

      it('should throw if arg is not boolean or object', function() {
        expect(function() {
          Schematik.object().additional.property(123);
        }).to.throw('Additional property must be a boolean or an object.');
      });

    });

  });

  describe('.properties()', function() {

    describe('with no flags', function() {

      it('should add the property', function() {
        const value = Schematik.object().properties({
          test1: Schematik.string(),
          test2: Schematik.number()
        });
        expect(value.done()).to.deep.equal({
          type: 'object',
          additionalProperties: true,
          properties: {
            test1: { type: 'string' },
            test2: { type: 'number' }
          },
          required: [ 'test1', 'test2' ]
        });
      });

      it('should throw if value is not an object', function() {
        expect(function() {
          Schematik.object().properties('');
        }).to.throw('Value must be an object.');
      });

    });

    describe('with `pattern` flag', function() {

      it('should add pattern properties', function() {

        const value = Schematik.object().pattern.properties({
          test1: Schematik.string(),
          test2: Schematik.number()
        });
        expect(value.done()).to.deep.equal({
          type: 'object',
          additionalProperties: true,
          patternProperties: {
            test1: { type: 'string' },
            test2: { type: 'number' }
          }
        });

      });

    });

    describe('with `additional` flag', function() {

      it('should act like property()', function() {
        const value = Schematik.object().no.additional.properties();
        expect(value.done()).to.have.property('additionalProperties', false);
      });

      it('should throw when argument is provided', function() {
        expect(function() {
          Schematik.object().additional.properties({ });
        }).to.throw('Value not supported with `additional` flag.');
      });

    });

  });

});
