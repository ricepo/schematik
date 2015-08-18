var sinon          = require('sinon');
var expect         = require('chai').expect;

var load           = require('../loader.js');
var Schematik      = load('index.js');

describe('.Object', function() {

  describe('.constructor()', function() {

    it('should be created using constructor', function() {
      var obj = new Schematik.Object();
      expect(obj).to.be.an.instanceof(Schematik.Object);
    });

    it('should be created using shorthand', function() {
      var obj = Schematik.object();
      expect(obj).to.be.an.instanceof(Schematik.Object);
    });

  });

  describe('.pattern', function() {

    it('should add the chainable property', function() {
      var obj = Schematik.object();
      expect(obj.pattern).to.be.an.instanceof(Schematik.Object);
    });

    it('should set the `pattern` flag', function() {
      var obj = Schematik.object().pattern;
      expect(obj.flag('pattern')).to.equal(true);
    });

  });

  describe('.count()', function() {

    it('should set the minimum count if `min` flag', function() {
      var obj = Schematik.object().min.count(42);
      expect(obj.done()).to.have.property('minProperties', 42);
    });

    it('should set the maximum count if `max` flag', function() {
      var obj = Schematik.object().max.count(42);
      expect(obj.done()).to.have.property('maxProperties', 42);
    });

    it('should set both min and max count if called with 2 args', function() {
      var obj = Schematik.object().count(41, 42);
      expect(obj.done()).to.have.property('minProperties', 41);
      expect(obj.done()).to.have.property('maxProperties', 42);
    });

    it('should set both min and max count if called with 1 args', function() {
      var obj = Schematik.object().count(42);
      expect(obj.done()).to.have.property('minProperties', 42);
      expect(obj.done()).to.have.property('maxProperties', 42);
    });

    it('should throw if min is greater than max', function() {
      var obj = Schematik.object().schema({ maxProperties: 0 });
      expect(function() {
        obj.min.count(42);
      }).to.throw('{min} cannot be greater than {max}');
    });

    it('should throw if max is less than min', function() {
      var obj = Schematik.object().schema({ minProperties: 42 });
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

      

    });

  });

});
