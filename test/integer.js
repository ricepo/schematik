chai      = require('chai');
expect    = chai.expect;
Schematik = require('../lib');

describe('Schematik.Integer', function() {

  describe('#ctor()', function() {

    it('should be created in object oriented way', function() {
      var s = new Schematik.Integer().done();
      expect(s).to.deep.equal({ type: 'integer' });
    });

    it('should be created in functional way', function() {
      var s = Schematik.integer().done();
      expect(s).to.deep.equal({ type: 'integer' });
    });

  });

  describe('#clone()', function() {

    it('should not affect cloned instances', function() {
      var a = Schematik.integer().min(99);
      var b = a.exclusive.max(100);

      expect(a.done()).to.deep.equal({
        type: 'integer',
        minimum: 99
      });

      expect(b.done()).to.deep.equal({
        type: 'integer',
        minimum: 99,
        maximum: 100,
        exclusiveMaximum: true
      });

    });

  });

  describe('modifiers', function() {

    it('should work with {optional} modifier', function() {
      var s = Schematik.optional.integer();
      expect(s.flag('required')).to.equal(false);
    });

    it('should work with {required} modifier', function() {
      var s = Schematik.optional.integer();
      expect(s.flag('required')).to.equal(false);
      s = s.required;
      expect(s.flag('required')).to.equal(true);
    });

    it('should have {exclusive} modifier set a flag', function() {
      var s = Schematik.integer().exclusive;
      expect(s.flag('exclusive')).to.equal(true);
    });

  });

  describe('#min()', function() {

    it('should set inclusive minimum value', function() {
      var s = Schematik.integer().min(10);
      expect(s.done()).to.deep.equal({
        type: 'integer',
        minimum: 10
      });
    });

    it('should work with {exclusive} modifier', function() {
      var s = Schematik.integer().exclusive.min(10);
      expect(s.done()).to.deep.equal({
        type: 'integer',
        minimum: 10,
        exclusiveMinimum: true
      });
    });

    it('should throw error if value is not a number', function() {
      expect(function() { Schematik.integer().min('test'); }).to.throw();
    });

    it('should throw error if value > maximum', function() {
      expect(function() { Schematik.integer().max(10).min(11); }).to.throw();
    });

  });

  describe('#max()', function() {

    it('should set inclusive maximum value', function() {
      var s = Schematik.integer().max(10);
      expect(s.done()).to.deep.equal({
        type: 'integer',
        maximum: 10
      });
    });

    it('should work with {exclusive} modifier', function() {
      var s = Schematik.integer().exclusive.max(10);
      expect(s.done()).to.deep.equal({
        type: 'integer',
        maximum: 10,
        exclusiveMaximum: true
      });
    });

    it('should throw error if value is not a number', function() {
      expect(function() { Schematik.integer().max('test'); }).to.throw();
    });

    it('should throw error if value < minimum', function() {
      expect(function() { Schematik.integer().min(10).max(9); }).to.throw();
    });

  });

  describe('#range()', function() {

    it('should set minimum and maximum values', function() {
      var s = Schematik.integer().range(9, 99);
      expect(s.done()).to.deep.equal({
        type: 'integer',
        minimum: 9,
        maximum: 99
      });
    });

    it('should work with {exclusive} modifier', function() {
      var s = Schematik.integer().exclusive.range(9, 99);
      expect(s.done()).to.deep.equal({
        type: 'integer',
        minimum: 9,
        maximum: 99,
        exclusiveMinimum: true,
        exclusiveMaximum: true
      });
    });

    it('should throw error if either value is not a number', function() {
      expect(function() { Schematik.integer().range('test', 9); }).to.throw();
      expect(function() { Schematik.integer().range(9, 'test'); }).to.throw();
    });

  });

  describe('#multiple()', function() {

    it('should set the multipleOf value', function() {
      var s = Schematik.integer().multiple(99);
      expect(s.done()).to.deep.equal({
        type: 'integer',
        multipleOf: 99
      });
    });

    it('should throw error if value is not a number', function() {
      expect(function() { Schematik.integer().multiple('test'); }).to.throw();
    });
  });

});
