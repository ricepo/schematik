chai      = require('chai');
expect    = chai.expect;
Schematik = require('../main.js');

describe("Schematik.Null", function () {

  it("should be correctly created in object oriented way", function () {
    var s = new Schematik.Null().done();
    expect(s).to.deep.equal({ required: true, type: 'null' });
  });

  it("should be correctly created in functional way", function () {
    var s = Schematik.null().done();
    expect(s).to.deep.equal({ required: true, type: 'null' });
  });

  it("should correctly work with {optional} modifier", function () {
    var s = Schematik.optional.null().done();
    expect(s).to.deep.equal({type: 'null'});
  });

  it("should correctly work with {required} modifier", function () {
    var s = Schematik.optional.null();
    expect(s.done()).to.deep.equal({type: 'null'});
    s = s.required;
    expect(s.done()).to.deep.equal({ required: true, type: 'null' });
  });

});
