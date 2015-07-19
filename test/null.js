chai      = require('chai');
expect    = chai.expect;
Schematik = require('../lib').dev();

describe('Schematik.Null', function() {

  describe('#ctor()', function() {

    it('should be created in object oriented way', function() {
      var s = new Schematik.Null().done();
      expect(s).to.deep.equal({ type: 'null' });
    });

    it('should be created in functional way', function() {
      var s = Schematik.null().done();
      expect(s).to.deep.equal({ type: 'null' });
    });

  });

  describe('#clone()', function() {

    it('should not affect cloned instances', function() {
      var a = Schematik.null();
      var b = a.clone().optional;

      expect(a.flag('required')).to.equal(true);
      expect(b.flag('required')).to.equal(false);
    });

  });

  describe('modifiers', function() {

    it('should work with {optional} modifier', function() {
      var s = Schematik.optional.null();
      expect(s.flag('required')).to.equal(false);
    });

    it('should work with {required} modifier', function() {
      var s = Schematik.optional.null();
      expect(s.flag('required')).to.equal(false);
      s = s.required;
      expect(s.flag('required')).to.equal(true);
    });

  });

});
