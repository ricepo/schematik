var sinon          = require('sinon');
var expect         = require('chai').expect;

var load           = require('../loader.js');
var Schematik      = load('index.js');

describe('.Integer', function() {

  describe('.constructor()', function() {

    it('should be created using constructor', function() {
      var obj = new Schematik.Integer();
      expect(obj).to.be.an.instanceof(Schematik.Integer);
      expect(obj.schema('type')).to.equal('integer');
    });

    it('should be created using shorthand', function() {
      var obj = Schematik.integer();
      expect(obj).to.be.an.instanceof(Schematik.Integer);
      expect(obj.schema('type')).to.equal('integer');
    });

  });

});
