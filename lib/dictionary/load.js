var fs = require('fs');

// Creates fileArray for a given path
var load = function(path) {
  var fileArray = fs.readdirSync(path);
  return fileArray;
};

module.exports = {
  load
}
