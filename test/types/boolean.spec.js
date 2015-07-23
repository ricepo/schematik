var sinon          = require('sinon');
var expect         = require('chai').expect;

var load           = require('../loader.js');
var Schematik      = load('index.js');

describe('.Boolean', function() {

  describe('.constructor()', function() {

    it('should be created using constructor', function() {
      var obj = new Schematik.Boolean();
      expect(obj).to.be.an.instanceof(Schematik.Boolean);
    });

    it('should be created using shorthand', function() {
      var obj = Schematik.boolean();
      expect(obj).to.be.an.instanceof(Schematik.Boolean);
    });

  });

});
