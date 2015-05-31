chai      = require('chai');
expect    = chai.expect;
Schematik = require('../main.js');

describe("Schematik Base", function () {

  describe("Error Checks", function () {

    it("should prevent type overwrites", function () {
      expect(function () { Schematik.string().number(); }).to.throw();
    });

  });

  describe("#clone()", function () {

    it("should not affect cloned instances", function () {
      var a = new Schematik();
      var b = a.clone().optional;

      expect(a.done()).to.deep.equal({
        type: 'any',
        required: true
      });

      expect(b.done()).to.deep.equal({
        type: 'any'
      });

    });

  });

});
