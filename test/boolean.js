chai      = require('chai');
expect    = chai.expect;
Schematik = require('../main.js');

describe('Schematik.Boolean', function() {

  describe('#ctor()', function() {

    it('should be created in object oriented way', function() {
      var s = new Schematik.Boolean().done();
      expect(s).to.deep.equal({ type: 'boolean' });
    });

    it('should be created in functional way', function() {
      var s = Schematik.boolean();
      expect(s.done()).to.deep.equal({ type: 'boolean' });
    });

    it('should handle custom schema parameters', function() {
      var s = new Schematik.Boolean({ test: 'data' });
      expect(s.done()).to.deep.equal({
        type: 'boolean',
        test: 'data'
      });
    });

  });

  describe('#clone()', function() {

    it('should not affect cloned instances', function() {
      var a = Schematik.boolean();
      var b = a.clone().optional;

      expect(a).to.have.deep.property('attrib.required', true);
      expect(b).to.have.deep.property('attrib.required', false);
    });

  });

  describe('modifiers', function() {

    it('should work with {optional} modifier', function() {
      var s = Schematik.optional.boolean();
      expect(s.done()).to.deep.equal({type: 'boolean'});
      expect(s).to.have.deep.property('attrib.required', false);
    });

    it('should work with {required} modifier', function() {
      var s = Schematik.optional.boolean();
      expect(s).to.have.deep.property('attrib.required', false);
      s = s.required;
      expect(s).to.have.deep.property('attrib.required', true);
    });

  });

});
