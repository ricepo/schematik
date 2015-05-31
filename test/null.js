chai      = require('chai');
expect    = chai.expect;
Schematik = require('../main.js');

describe("Schematik.Null", function () {

  describe("#ctor()", function () {

    it("should be created in object oriented way", function () {
      var s = new Schematik.Null().done();
      expect(s).to.deep.equal({ required: true, type: 'null' });
    });

    it("should be created in functional way", function () {
      var s = Schematik.null().done();
      expect(s).to.deep.equal({ required: true, type: 'null' });
    });

    it("should handle custom schema parameters", function () {
      var s = new Schematik.Null({ test: 'data' });
      expect(s.done()).to.deep.equal({
        type: 'null',
        required: true,
        test: 'data'
      });
    });

  });

  describe("modifiers", function () {

    it("should work with {optional} modifier", function () {
      var s = Schematik.optional.null().done();
      expect(s).to.deep.equal({type: 'null'});
    });

    it("should work with {required} modifier", function () {
      var s = Schematik.optional.null();
      expect(s.done()).to.deep.equal({type: 'null'});
      s = s.required;
      expect(s.done()).to.deep.equal({ required: true, type: 'null' });
    });

  });

});
