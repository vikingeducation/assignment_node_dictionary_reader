var fs = require('fs');

var toFile = (results, path) => {
  var wholePath = './data/saves/' + path;
  fs.writeFileSync(wholePath, results);
  console.log(`Results saved to ${path}.`);
};

module.exports = {
  toFile
}
