var Path = require('path');

module.exports = function(path) {
  path = Path.resolve(__dirname, '../lib', path);
  var result = require(path);
  return result.default ? result.default : result;
};
