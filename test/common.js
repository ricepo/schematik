chai      = require('chai');
expect    = chai.expect;
Schematik = require('../main.js');

describe("Schematik Base", function () {

  describe("Error Checks", function () {

    it("should prevent type overwrites", function () {
      expect(function () { Schematik.string().number(); }).to.throw();
    });

  });

});
