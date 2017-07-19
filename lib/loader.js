// Load a given json file
// Display some pretty information about it
// Pass it into a given callback

const fs = require('fs');
const info = require('./ui/info');

function load(path, callback) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err || !data) {
      callback(err);
    } else {
      data = JSON.parse(data);
      info(path, data);
      callback(null, path, data);
    }
  });
}

module.exports = load;
