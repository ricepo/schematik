chai      = require('chai');
expect    = chai.expect;
Schematik = require('../main.js');

describe("Schematik.Boolean", function () {

  describe("#ctor()", function () {

    it("should be created in object oriented way", function () {
      var s = new Schematik.Boolean().done();
      expect(s).to.deep.equal({ required: true, type: 'boolean' });
    });

    it("should be created in functional way", function () {
      var s = Schematik.boolean().done();
      expect(s).to.deep.equal({ required: true, type: 'boolean' });
    });

  });

  describe("modifiers", function () {

    it("should work with {optional} modifier", function () {
      var s = Schematik.optional.boolean().done();
      expect(s).to.deep.equal({type: 'boolean'});
    });

    it("should work with {required} modifier", function () {
      var s = Schematik.optional.boolean();
      expect(s.done()).to.deep.equal({type: 'boolean'});
      s = s.required;
      expect(s.done()).to.deep.equal({ required: true, type: 'boolean' });
    });

  });

});
