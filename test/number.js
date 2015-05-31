chai      = require('chai');
expect    = chai.expect;
Schematik = require('../main.js');

describe("Schematik.Number", function () {

  describe("#ctor()", function () {

    it("should be created in object oriented way", function () {
      var s = new Schematik.Number().done();
      expect(s).to.deep.equal({ required: true, type: 'number' });
    });

    it("should be created in functional way", function () {
      var s = Schematik.number().done();
      expect(s).to.deep.equal({ required: true, type: 'number' });
    });

    it("should handle custom schema parameters", function () {
      var s = new Schematik.Number({ test: 'data' });
      expect(s.done()).to.deep.equal({
        type: 'number',
        required: true,
        test: 'data'
      });
    });

  });

  describe("#clone()", function () {

    it("should not affect cloned instances", function () {
      var a = Schematik.number().min(99);
      var b = a.clone().exclusive.max(100);

      expect(a.done()).to.deep.equal({
        type: 'number',
        required: true,
        minimum: 99
      });

      expect(b.done()).to.deep.equal({
        type: 'number',
        required: true,
        minimum: 99,
        maximum: 100,
        exclusiveMaximum: true
      });

    });

  });

  describe("modifiers", function () {

    it("should work with {optional} modifier", function () {
      var s = Schematik.optional.number().done();
      expect(s).to.deep.equal({type: 'number'});
    });

    it("should work with {required} modifier", function () {
      var s = Schematik.optional.number();
      expect(s.done()).to.deep.equal({type: 'number'});
      s = s.required;
      expect(s.done()).to.deep.equal({ required: true, type: 'number' });
    });

    it("should work with {exclusive} modifier", function () {
      var s = Schematik.number().min(9).exclusive.max(99);
      expect(s.done()).to.deep.equal({
        type: 'number',
        required: true,
        minimum: 9,
        maximum: 99,
        exclusiveMaximum: true
      });
    });

  });

  describe("#min()", function () {

    it("should set inclusive minimum value", function () {
      var s = Schematik.number().min(10);
      expect(s.done()).to.deep.equal({
        type: 'number',
        required: true,
        minimum: 10}
      );
    });

    it("should work with {exclusive} modifier", function () {
      var s = Schematik.number().exclusive.min(10);
      expect(s.done()).to.deep.equal({
        type: 'number',
        required: true,
        minimum: 10,
        exclusiveMinimum: true
      });
    });

    it("should throw error if value is not a number", function () {
      expect(function () { Schematik.number().min('test'); }).to.throw();
    });

    it("should throw error if value > maximum", function () {
      expect(function () { Schematik.number().max(10).min(11); }).to.throw();
    });

  });

  describe("#max()", function () {

    it("should set inclusive maximum value", function () {
      var s = Schematik.number().max(10);
      expect(s.done()).to.deep.equal({
        type: 'number',
        required: true,
        maximum: 10}
      );
    });

    it("should work with {exclusive} modifier", function () {
      var s = Schematik.number().exclusive.max(10);
      expect(s.done()).to.deep.equal({
        type: 'number',
        required: true,
        maximum: 10,
        exclusiveMaximum: true
      });
    });

    it("should throw error if value is not a number", function () {
      expect(function () { Schematik.number().max('test'); }).to.throw();
    });

    it("should throw error if value < minimum", function () {
      expect(function () { Schematik.number().min(10).max(9); }).to.throw();
    });

  });

  describe("#range()", function () {

    it("should set minimum and maximum values", function () {
      var s = Schematik.number().range(9, 99);
      expect(s.done()).to.deep.equal({
        type: 'number',
        required: true,
        minimum: 9,
        maximum: 99
      });
    });

    it("should work with {exclusive} modifier", function () {
      var s = Schematik.number().exclusive.range(9, 99);
      expect(s.done()).to.deep.equal({
        type: 'number',
        required: true,
        minimum: 9,
        maximum: 99,
        exclusiveMinimum: true,
        exclusiveMaximum: true
      });
    });

    it("should throw error if either value is not a number", function () {
      expect(function () { Schematik.number().range('test', 9); }).to.throw();
      expect(function () { Schematik.number().range(9, 'test'); }).to.throw();
    });

  });

  describe("#multiple()", function () {

    it("should set the multipleOf value", function () {
      var s = Schematik.number().multiple(99);
      expect(s.done()).to.deep.equal({
        type: 'number',
        required: true,
        multipleOf: 99
      });
    });

    it("should throw error if value is not a number", function () {
      expect(function () { Schematik.number().multiple('test'); }).to.throw();
    });


  });

});
