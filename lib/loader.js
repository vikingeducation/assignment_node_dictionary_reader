const fs = require('fs');

function load(path, callback) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err || !data) {
      callback(err);
    } else {
      data = JSON.parse(data);
      callback(null, path, data);
    }
  });
}

module.exports = load;
