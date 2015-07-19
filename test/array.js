chai      = require('chai');
expect    = chai.expect;
Schematik = require('../lib').dev();

describe('Schematik.Array', function() {

  describe('#ctor()', function() {

    it('should be created in object oriented way', function() {
      var s = new Schematik.Array().done();
      expect(s).to.deep.equal({ type: 'array' });
    });

    it('should be created in functional way', function() {
      var s = Schematik.array().done();
      expect(s).to.deep.equal({ type: 'array' });
    });

  });

  describe('immutability', function() {

    it('should not affect cloned instances', function() {
      var a = Schematik.array().items(Schematik.string());
      var b = a.max.length(100);

      expect(a.done()).to.deep.equal({
        type: 'array',
        items: { type: 'string' }
      });

      expect(b.done()).to.deep.equal({
        type: 'array',
        items: { type: 'string' },
        maxItems: 100
      });

    });

  });

  describe('modifiers', function() {

    it('should work with {optional} modifier', function() {
      var s = Schematik.optional.array();
      expect(s).to.have.deep.property('@@flags.required', false);
    });

    it('should work with {required} modifier', function() {
      var s = Schematik.optional.array();
      expect(s).to.have.deep.property('@@flags.required', false);
      s = s.required;
      expect(s).to.have.deep.property('@@flags.required', true);
    });

    it('should work with {Schematik.unique} modifier', function() {
      var s = Schematik.unique.array();
      expect(s.done()).to.deep.equal({
        type: 'array',
        uniqueItems: true
      });
    });

    it('should work with {Schematik.Array.unique} modifier', function() {
      var s = Schematik.array().unique;
      expect(s.done()).to.deep.equal({
        type: 'array',
        uniqueItems: true
      });
    });

    it('should have {min} modifier set the flag', function() {
      var s = Schematik.array().min;
      expect(s).to.have.deep.property('@@flags.range', 'min');
    });

    it('should have {max} modifier set the flag', function() {
      var s = Schematik.array().max;
      expect(s).to.have.deep.property('@@flags.range', 'max');
    });

  });

  describe('#items()', function() {

    it('should handle one non-Schematik argument', function() {
      var s = Schematik.array().items({type: 'test'});
      expect(s.done()).to.deep.equal({
        type: 'array',
        items: { type: 'test' }
      });
    });

    it('should handle one Schematik argument', function() {
      var s = Schematik.array().items(Schematik.string().with.length(9, 99));
      expect(s.done()).to.deep.equal({
        type: 'array',
        items: {
          type: 'string',
          minLength: 9,
          maxLength: 99
        }
      });
    });

    it('should handle multiple non-Schematik arguments', function() {
      var s = Schematik.array().items({type: 'test1'}, {type: 'test2'}, {type: 'test3'});
      expect(s.done()).to.deep.equal({
        type: 'array',
        items: [
          { type: 'test1' },
          { type: 'test2' },
          { type: 'test3' }
        ]
      });
    });

    it('should handle multiple Schematik arguments', function() {
      var s = Schematik.array().items(
        Schematik.string().with.length(9, 99),
        Schematik.number().in.range.of(10, 100)
      );
      expect(s.done()).to.deep.equal({
        type: 'array',
        items: [
          {
            type: 'string',
            minLength: 9,
            maxLength: 99
          },
          {
            type: 'number',
            minimum: 10,
            maximum: 100
          }
        ]
      });
    });

    it('should handle multiple mixed arguments', function() {
      var s = Schematik.array().items(
        Schematik.string().with.length(9, 99),
        { type: 'test' },
        Schematik.number().in.range.of(10, 100)
      );
      expect(s.done()).to.deep.equal({
        type: 'array',
        items: [
          {
            type: 'string',
            minLength: 9,
            maxLength: 99
          },
          {
            type: 'test'
          },
          {
            type: 'number',
            minimum: 10,
            maximum: 100
          }
        ]
      });
    });

    it('should handle nested array Schematiks', function() {
      var s = Schematik.array().items(
        Schematik.string().that.matches(/\w{0,2}$/),
        Schematik.array().items(
          Schematik.number()
        )
      );
      expect(s.done()).to.deep.equal({
        type: 'array',
        items: [
          {
            type: 'string',
            pattern: '\\w{0,2}$'
          },
          {
            type: 'array',
            items: {
              type: 'number'
            }
          }
        ]
      });
    });

    it('should throw when no arguments are supplied', function() {
      expect(function() { Schematik.array().items(); }).to.throw();
    });

  });

  describe('#more[.items()]', function() {

    it('should set the `additional` flag to true', function() {
      var s = Schematik.array().of(Schematik.string()).more;
      expect(s).to.have.deep.property('@@flags.additional', true);
    });

    it('should handle a boolean argument', function() {
      var s = Schematik.array().items(Schematik.string()).and.more.items(true);
      expect(s.done()).to.deep.equal({
        type: 'array',
        items: {
          type: 'string'
        },
        additionalItems: true
      });
    });

    it('should default to true when no arguments are supplied', function() {
      var s = Schematik.array().items(Schematik.string()).and.more.items();
      expect(s.done()).to.deep.equal({
        type: 'array',
        items: {
          type: 'string'
        },
        additionalItems: true
      });
    });

    it('should handle a non-Schematik argument', function() {
      var s = Schematik.array().items(Schematik.string()).and.more.items({ type: 'test' });
      expect(s.done()).to.deep.equal({
        type: 'array',
        items: {
          type: 'string'
        },
        additionalItems: {
          type: 'test'
        }
      });
    });

    it('should handle a Schematik argument', function() {
      var s = Schematik.array().items(Schematik.string()).and.more.items(Schematik.number());
      expect(s.done()).to.deep.equal({
        type: 'array',
        items: {
          type: 'string'
        },
        additionalItems: {
          type: 'number'
        }
      });
    });

    it('should throw when the argument is not a boolean or object', function() {
      expect(function() {
        Schematik.array().items(Schematik.number()).and.more.items(123);
      }).to.throw();
    });

  });

  describe('#length()', function() {

    it('should set minimum length with {min} modifier', function() {
      var s = Schematik.array().min.length(99);
      expect(s.done()).to.deep.equal({
        type: 'array',
        minItems: 99
      });
    });

    it('should set maximum length with {max} modifier', function() {
      var s = Schematik.array().max.length(99);
      expect(s.done()).to.deep.equal({
        type: 'array',
        maxItems: 99
      });
    });

    it('should set minimum and maximum lengths with two arguments', function() {
      var s = Schematik.array().length(9, 99);
      expect(s.done()).to.deep.equal({
        type: 'array',
        minItems: 9,
        maxItems: 99
      });
    });

    it('should set minimum and maximum lengths with one argument', function() {
      var s = Schematik.array().length(9);
      expect(s.done()).to.deep.equal({
        type: 'array',
        minItems: 9,
        maxItems: 9
      });
    });

    it('should throw when first argument is not a number', function() {
      expect(function() { Schematik.array().length('test'); }).to.throw();
    });

    it('should ignore the second argument if it is not a number', function() {
      var s = Schematik.array().length(9, 'test');
      expect(s.done()).to.deep.equal({
        type: 'array',
        minItems: 9,
        maxItems: 9
      });
    });

  });

});
