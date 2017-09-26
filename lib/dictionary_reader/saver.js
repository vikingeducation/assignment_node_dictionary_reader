const fs = require('fs');

function saver(path, matches, callback) {
  fs.open(path, 'wx', (err, fd) => {
    if (err) {
      if (err.code === 'EEXIST') {
        callback(true);
        return;
      }
      throw err;
    }
    callback(false);
  });
}

function writeData(path, matches, dictionary, writeMessage) {
  let data = {};
  matches.forEach((match) => {
    data[match] = dictionary[match];
  });
  data = JSON.stringify(data, null, '\n');

  fs.writeFile(path, data, 'utf8', (err) => {
    if (err) {
      throw err;
    }
    console.log(writeMessage);
  });
}


module.exports = {
  saver,
  writeData
};
