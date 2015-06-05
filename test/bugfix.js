// Tests for already fixed bugs
chai      = require('chai');
expect    = chai.expect;
Schematik = require('../main.js');

describe('Bugfixes', function() {

  it('Constructors should not modify object prototype.', function() {

    var a = new Schematik.Array({ test: 'data' });
    var b = new Schematik.Array();

    expect(b.done()).not.to.have.property('test');
  });

});
