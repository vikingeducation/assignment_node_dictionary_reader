// Pass an object containing the available dictionary files
// into a given callback

const fs = require('fs');

function findDicts(callback) {
  fs.readdir('./data', (err, files) => {
    if (err) {
      callback(err);
    } else {
      let dictionaries = {};
      for (let i = 0; i < files.length; i++) {
        dictionaries[i + 1] = './data/' + files[i];
      }
      callback(null, dictionaries);
    }
  });
}

module.exports = findDicts;
