var fs = require('fs');

var toFile = (results, path) => {
  var wholePath = './data/saves/' + path;
  fs.writeFile(wholePath, results, 'utf8', (err) => {
    if (err) { throw err; }
    else {
      console.log(`Results saved to ${path}.`);
    }
  });
}

module.exports = {
  toFile
}
