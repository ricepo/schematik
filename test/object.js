chai      = require('chai');
expect    = chai.expect;
Schematik = require('../main.js');

describe("Schematik.Object", function () {

  describe("#ctor()", function () {

    it("should be created in object oriented way", function () {
      var s = new Schematik.Object().done();
      expect(s).to.deep.equal({ required: true, type: 'object' });
    });

    it("should be created in functional way", function () {
      var s = Schematik.object().done();
      expect(s).to.deep.equal({ required: true, type: 'object' });
    });

    it("should handle custom schema parameters", function () {
      var s = new Schematik.Object({ test: 'data' });
      expect(s.done()).to.deep.equal({
        type: 'object',
        required: true,
        test: 'data'
      });
    });

  });

  describe("modifiers", function () {

    it("should work with {optional} modifier", function () {
      var s = Schematik.optional.object().done();
      expect(s).to.deep.equal({type: 'object'});
    });

    it("should work with {required} modifier", function () {
      var s = Schematik.optional.object();
      expect(s.done()).to.deep.equal({type: 'object'});
      s = s.required;
      expect(s.done()).to.deep.equal({ required: true, type: 'object' });
    });

    it("should have {min} modifier set the flag", function () {
      var s = Schematik.object().min;
      expect(s).to.have.deep.property('flags.min', true);
    });

    it("should have {max} modifier set the flag", function () {
      var s = Schematik.object().max;
      expect(s).to.have.deep.property('flags.max', true);
    });

    it("should have {additional} modifier set the flag", function () {
      var s = Schematik.object().additional;
      expect(s).to.have.deep.property('flags.additional', true);
    });

    it("should have {pattern} modifier set the flag", function () {
      var s = Schematik.object().pattern;
      expect(s).to.have.deep.property('flags.pattern', true);
    });

    it("should have {no} modifier set the flag", function () {
      var s = Schematik.object().no;
      expect(s).to.have.deep.property('flags.no', true);
    });

  });

  describe("#count()", function () {

    it('should set minimum property count with {min} modifier', function () {
      var s = Schematik.object().min.count(99);
      expect(s.done()).to.deep.equal({
        type: 'object',
        required: true,
        minProperties: 99
      });
    });

    it('should set maximum length with {max} modifier', function () {
      var s = Schematik.object().max.count(99);
      expect(s.done()).to.deep.equal({
        type: 'object',
        required: true,
        maxProperties: 99
      });
    });

    it('should set minimum and maximum lengths with two arguments', function () {
      var s = Schematik.object().count(9, 99);
      expect(s.done()).to.deep.equal({
        type: 'object',
        required: true,
        minProperties: 9,
        maxProperties: 99
      });
    });

    it('should set minimum and maximum lengths with one argument', function () {
      var s = Schematik.object().count(9);
      expect(s.done()).to.deep.equal({
        type: 'object',
        required: true,
        minProperties: 9,
        maxProperties: 9
      });
    });

    it('should throw when first argument is not a number', function () {
      expect(function () { Schematik.object().count('test'); }).to.throw();
    });

    it('should ignore the second argument if it is not a number', function () {
      var s = Schematik.object().count(9, 'test');
      expect(s.done()).to.deep.equal({
        type: 'object',
        required: true,
        minProperties: 9,
        maxProperties: 9
      });
    });

  });

  describe("#property()", function () {

    describe("no modifiers", function () {

      it("should add a property to the schema", function () {
        var s = Schematik.object().with.property('test', Schematik.string());
        expect(s.done()).to.deep.equal({
          type: 'object',
          required: true,
          properties: {
            test: {
              type: 'string',
              required: true
            }
          }
        });
        s = s.with.property('foo', { type: 'bar' });
        expect(s.done()).to.deep.equal({
          type: 'object',
          required: true,
          properties: {
            test: {
              type: 'string',
              required: true
            },
            foo: {
              type: 'bar'
            }
          }
        });
      });

      it("should throw if key or value is of invalid type", function () {
        expect(function () {
          Schematik.object().property(1, { });
        }).to.throw();
        expect(function () {
          Schematik.object().property('test', 1);
        }).to.throw();
      });

      it("should throw when attempting to overwrite a property", function () {
        var s = Schematik.object().with.property('test', Schematik.string());
        expect(s.done()).to.deep.equal({
          type: 'object',
          required: true,
          properties: {
            test: {
              type: 'string',
              required: true
            }
          }
        });
        expect(function () {
          s.property('test', Schematik.number());
        }).to.throw();
      });

    });

    describe("{additional} modifier", function () {

      it("should set the additional property", function () {
        var s = Schematik.object().additional.property(Schematik.string());
        expect(s.done()).to.deep.equal({
          type: 'object',
          required: true,
          additionalProperties: {
            type: 'string'
          }
        });
        var a = Schematik.object().additional.property(false);
        expect(a.done()).to.deep.equal({
          type: 'object',
          required: true,
          additionalProperties: false
        });
      });

      it("should pick default when there is no parameter", function () {
        var s = Schematik.object().additional.property();
        expect(s.done()).to.deep.equal({
          type: 'object',
          required: true,
          additionalProperties: true
        });
        var a = Schematik.object().no.additional.property();
        expect(a.done()).to.deep.equal({
          type: 'object',
          required: true,
          additionalProperties: false
        });
      });

      it("should throw if argument is not a boolean or object", function () {
        expect(function () {
          Schematik.object().additional.property(1);
        }).to.throw();
      });

      it("should throw when attempting to overwrite", function () {
        expect(function () {
          Schematik.object().additional.property(Schematik.string()).additional.property(false);
        }).to.throw();
      });

    });

    describe("{pattern} modifier", function () {

      it("should add a pattern property to the schema", function () {
        var s = Schematik.object().pattern.property(/\d+/, Schematik.string());
        expect(s.done()).to.deep.equal({
          type: 'object',
          required: true,
          patternProperties: {
            "\\d+": {
              type: 'string',
              required: true
            }
          }
        });
        s = s.with.pattern.property(/[0-9]+/, { type: 'bar' });
        expect(s.done()).to.deep.equal({
          type: 'object',
          required: true,
          patternProperties: {
            "\\d+": {
              type: 'string',
              required: true
            },
            "[0-9]+": {
              type: 'bar'
            }
          }
        });
      });

      it("should throw when key is not a regex", function () {
        expect(function () {
          Schematik.object().pattern.property(123, Schematik.string());
        }).to.throw();
      });

      it("should throw when value is not an object", function () {
        expect(function () {
          Schematik.object().pattern.property(/[0-9]+/, 123);
        }).to.throw();
      });

      it("should throw when attempting to overwrite an existing property", function () {
        expect(function () {
          Schematik.object()
          .pattern.property(/[0-9]+/, Schematik.string())
          .pattern.property(/[0-9]+/, Schematik.number());
        }).to.throw();
      });

    });

  });
});
