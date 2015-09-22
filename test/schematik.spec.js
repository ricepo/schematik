
/* eslint-env mocha */

const Sinon          = require('sinon');
const expect         = require('chai').expect;
const load           = require('./loader.js');
const Schematik      = load('index.js');


describe('Schematik', function() {

  describe('schema', function() {

    it('should throw when applying a non-object', function() {
      expect(function() {
        new Schematik().schema(123);
      }).to.throw('Value must be a string or an object.');
    });

  });

  describe('copyTo', function() {

    it('should throw when copying to a non-Schematik', function() {
      expect(function() {
        const object = { };
        new Schematik().copyTo(object);
      }).to.throw('Cannot copy to a non-Schematik object.');
    });

  });

  describe('toString', function() {

    it('should return [object Schematik]', function() {
      const actual = new Schematik().toString();
      expect(actual).to.equal('[object Schematik]');
    });

  });

  describe('__type', function() {

    it('should get the type if none is specified', function() {
      const object = Schematik.number();
      const actual = object.__type();

      expect(actual).to.equal('number');
    });

    it('should throw if type is not whitelisted', function() {
      const object = new Schematik();
      expect(function() {
        object.__type('test');
      }).to.throw('Invalid type value test');
    });

    it('should not allow overwriting', function() {
      const object = Schematik.number();
      expect(function() {
        object.__type('string');
      }).to.throw('Overwriting existing type is not allowed.');
    });

  });

  describe('use', function() {

    it('should not use the same extension twice', function() {
      const ext = Sinon.spy();

      Schematik.use(ext);
      Schematik.use(ext);

      expect(ext.calledOnce).to.be.true;
    });

  });

});
