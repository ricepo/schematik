chai      = require('chai');
expect    = chai.expect;
Schematik = require('../lib');

describe('Schematik.String', function() {

  describe('#ctor()', function() {

    it('should be created in object oriented way', function() {
      var s = new Schematik.String().done();
      expect(s).to.deep.equal({ type: 'string' });
    });

    it('should be created in functional way', function() {
      var s = Schematik.string().done();
      expect(s).to.deep.equal({ type: 'string' });
    });

    it('should handle custom schema parameters', function() {
      var s = new Schematik.String({ test: 'data' });
      expect(s.done()).to.deep.equal({
        type: 'string',
        test: 'data'
      });
    });

  });

  describe('modifiers', function() {

    it('should work with {optional} modifier', function() {
      var s = Schematik.optional.string();
      expect(s).to.have.deep.property('attrib.required', false);
    });

    it('should work with {required} modifier', function() {
      var s = Schematik.optional.string();
      expect(s).to.have.deep.property('attrib.required', false);
      s = s.required;
      expect(s).to.have.deep.property('attrib.required', true);
    });

    it('should have {min} modifier set the flag', function() {
      var s = Schematik.string().min;
      expect(s).to.have.deep.property('flags.min', true);
    });

    it('should have {max} modifier set the flag', function() {
      var s = Schematik.string().max;
      expect(s).to.have.deep.property('flags.max', true);
    });

  });

  describe('#length()', function() {

    it('should set minimum length with {min} modifier', function() {
      var s = Schematik.string().min.length(99);
      expect(s.done()).to.deep.equal({
        type: 'string',
        minLength: 99
      });
    });

    it('should set maximum length with {max} modifier', function() {
      var s = Schematik.string().max.length(99);
      expect(s.done()).to.deep.equal({
        type: 'string',
        maxLength: 99
      });
    });

    it('should set minimum and maximum lengths with two arguments', function() {
      var s = Schematik.string().length(9, 99);
      expect(s.done()).to.deep.equal({
        type: 'string',
        minLength: 9,
        maxLength: 99
      });
    });

    it('should set minimum and maximum lengths with one argument', function() {
      var s = Schematik.string().length(9);
      expect(s.done()).to.deep.equal({
        type: 'string',
        minLength: 9,
        maxLength: 9
      });
    });

    it('should throw when first argument is not a number', function() {
      expect(function() { Schematik.string().length('test'); }).to.throw();
    });

    it('should ignore the second argument if it is not a number', function() {
      var s = Schematik.string().length(9, 'test');
      expect(s.done()).to.deep.equal({
        type: 'string',
        minLength: 9,
        maxLength: 9
      });
    });

  });

  describe('#matches()', function() {

    it('should set the pattern value', function() {
      var s = Schematik.string().matches(/\d+/);
      expect(s.done()).to.deep.equal({
        type: 'string',
        pattern: '\\d+'
      });
    });

    it('should throw if the value is not a regex', function() {
      expect(function() { Schematik.string().matches(); }).to.throw();
      expect(function() { Schematik.string().matches(0); }).to.throw();
    });

  });

});
