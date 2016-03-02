/**
 * test/types/string.spec.js
 *
 * @author  Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license MIT
 */
const Schematik    = dofile('index');


describe('.String', function() {

  describe('.constructor()', function() {

    it('should be created using constructor', function() {
      const obj = new Schematik.String();
      expect(obj).to.be.an.instanceof(Schematik.String);
    });

    it('should be created using shorthand', function() {
      const obj = Schematik.string();
      expect(obj).to.be.an.instanceof(Schematik.String);
    });

  });

  describe('.length()', function() {

    it('should set the minimum length with `min` flag', function() {
      const obj = Schematik.string().min.length(42);
      expect(obj.done()).to.deep.equal({
        type: 'string',
        minLength: 42
      });
    });

    it('should set the maximum length with `max` flag', function() {
      const obj = Schematik.string().max.length(42);
      expect(obj.done()).to.deep.equal({
        type: 'string',
        maxLength: 42
      });
    });

    it('should set both min and max lengths when called with 2 params', function() {
      const obj = Schematik.string().length(42, 47);
      expect(obj.done()).to.deep.equal({
        type: 'string',
        minLength: 42,
        maxLength: 47
      });
    });

    it('should set both min and max lengths when called with 1 param', function() {
      const obj = Schematik.string().length(42);
      expect(obj.done()).to.deep.equal({
        type: 'string',
        minLength: 42,
        maxLength: 42
      });
    });

    it('should clear the `range` flag', function() {
      const obj = Schematik.string().min.length(20);
      expect(obj.flag('range')).to.equal(null);
    });

    it('should throw when called with a non-number argument', function() {
      expect(function() {
        Schematik.string().length('test');
      }).to.throw('Length value must be a number.');
    });

  });

  describe('.matches()', function() {

    it('should set the pattern value', function() {
      const obj = Schematik.string().pattern(/[0-9]/);
      expect(obj.done()).to.have.property('pattern', '[0-9]');
    });

    it('should throw if argument is not a regular expression', function() {
      expect(function() {
        Schematik.string().pattern('test');
      }).to.throw('Pattern must be an instance of RegExp.');
    });

  });

});
