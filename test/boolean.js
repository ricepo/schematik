chai      = require('chai');
expect    = chai.expect;
Schematik = require('../main.js');

describe("Schematik.Boolean", function () {

  it("should be correctly created in object oriented way", function () {
    var s = new Schematik.Boolean().done();
    expect(s).to.deep.equal({ required: true, type: 'boolean' });
  });

  it("should be correctly created in functional way", function () {
    var s = Schematik.boolean().done();
    expect(s).to.deep.equal({ required: true, type: 'boolean' });
  });

  it("should correctly work with {optional} modifier", function () {
    var s = Schematik.optional.boolean().done();
    expect(s).to.deep.equal({type: 'boolean'});
  });

  it("should correctly work with {required} modifier", function () {
    var s = Schematik.optional.boolean();
    expect(s.done()).to.deep.equal({type: 'boolean'});
    s = s.required;
    expect(s.done()).to.deep.equal({ required: true, type: 'boolean' });
  });

});
