var sinon          = require('sinon');
var expect         = require('chai').expect;

var load           = require('../loader.js');
var Schematik      = load('index.js');

describe('.Null', function() {

  describe('.constructor()', function() {

    it('should be created using constructor', function() {
      var obj = new Schematik.Null();
      expect(obj).to.be.an.instanceof(Schematik.Null);
    });

    it('should be created using shorthand', function() {
      var obj = Schematik.null();
      expect(obj).to.be.an.instanceof(Schematik.Null);
    });

  });

});
