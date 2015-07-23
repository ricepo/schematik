var sinon          = require('sinon');
var expect         = require('chai').expect;

var load           = require('../loader.js');
var Schematik      = load('index.js');

describe('.Number', function() {

  describe('.constructor()', function() {

    it('should be created using constructor', function() {
      var obj = new Schematik.Number();
      expect(obj).to.be.an.instanceof(Schematik.Number);
    });

    it('should be created using shorthand', function() {
      var obj = Schematik.number();
      expect(obj).to.be.an.instanceof(Schematik.Number);
    });

  });

  describe('.exclusive', function() {

    it('should add the chainable property', function() {
      var obj = Schematik.number();
      expect(obj.exclusive).to.be.an.instanceof(Schematik.Number);
    });

    it('should set the `exclusive` flag to true', function() {
      var obj = Schematik.number().exclusive;
      expect(obj.flag('exclusive')).to.equal(true);
    });

  });

  describe('.min()', function() {

    it('should set the minimum value', function() {
      var obj = Schematik.number().min(42);
      expect(obj.done()).to.deep.equal({
        type: 'number',
        minimum: 42
      });
    });

    it('should set the exclusive minimum if `exclusive` flag', function() {
      var obj = Schematik.number().exclusive.min(42);
      expect(obj.done()).to.deep.equal({
        type: 'number',
        minimum: 42,
        exclusiveMinimum: true
      });
    });

    it('should clear the `exclusive` flag', function() {
      var obj = Schematik.number().exclusive.min(42);
      expect(obj.flag('exclusive')).to.equal(false);
    });

    it('should throw if the value is not a number', function() {
      expect(function() {
        Schematik.number().min('test');
      }).to.throw('{value} must be a number.');
    });

    it('should throw if the value is greater than max', function() {
      var obj = Schematik.number().schema({ maximum: 0 });
      expect(function() {
        obj.min(42);
      }).to.throw('{min} cannot be greater than {max}.');
    });

  });

  describe('.max()', function() {

    it('should set the maximum value', function() {
      var obj = Schematik.number().max(42);
      expect(obj.done()).to.deep.equal({
        type: 'number',
        maximum: 42
      });
    });

    it('should set the exclusive maximum if `exclusive` flag', function() {
      var obj = Schematik.number().exclusive.max(42);
      expect(obj.done()).to.deep.equal({
        type: 'number',
        maximum: 42,
        exclusiveMaximum: true
      });
    });

    it('should clear the `exclusive` flag', function() {
      var obj = Schematik.number().exclusive.max(42);
      expect(obj.flag('exclusive')).to.equal(false);
    });

    it('should throw if the value is not a number', function() {
      expect(function() {
        Schematik.number().max('test');
      }).to.throw('{value} must be a number.');
    });

    it('should throw if the value is less than min', function() {
      var obj = Schematik.number().schema({ minimum: 42 });
      expect(function() {
        obj.max(0);
      }).to.throw('{max} cannot be less than {min}.');
    });

  });

  describe('.range()', function() {

    it('should set both minimum and maximum values', function() {
      var obj = Schematik.number().range(1, 2);
      expect(obj.done()).to.deep.equal({
        type: 'number',
        minimum: 1,
        maximum: 2
      });
    });

    it('should set exclusive values if flag is present', function() {
      var obj = Schematik.number().exclusive.range(1, 2);
      expect(obj.done()).to.deep.equal({
        type: 'number',
        minimum: 1,
        maximum: 2,
        exclusiveMinimum: true,
        exclusiveMaximum: true
      });
    });

    it('should clear the `exclusive` flag', function() {
      var obj = Schematik.number().exclusive.range(1, 2);
      expect(obj.flag('exclusive')).to.equal(false);
    });

    it('should throw when maximum is less than minimum', function() {
      expect(function() {
        Schematik.number().range(2, 1);
      }).to.throw('Min cannot be greater than max.');
    });

    it('should throw when min or max is not a number', function() {
      expect(function() {
        Schematik.number().range('a', 2);
      }).to.throw('Min and max values must be numbers.');
      expect(function() {
        Schematik.number().range(1, 'a');
      }).to.throw('Min and max values must be numbers.');
    });

  });

  describe('.multiple()', function() {

    it('should set the multipleOf value', function() {
      var obj = Schematik.number().multiple(42);
      expect(obj.done()).to.deep.equal({
        type: 'number',
        multipleOf: 42
      });
    });

    it('should throw if the argument is not a number', function() {
      expect(function() {
        Schematik.number().multiple('test');
      }).to.throw('{value} must be a number.');
    });

  });

});
