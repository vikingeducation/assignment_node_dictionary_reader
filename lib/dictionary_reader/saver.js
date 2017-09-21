var fs = require('fs');
var colorizer = require('./colorizer');
var q = colorizer.colorize("'q'", 'green');

function saver(path, matches, callback) {
  fs.open(path, 'wx', (err, fd) => {
    if (err) {
      if (err.code === 'EEXIST') {
        callback(`\nThat file exists, overwrite? y/n? ${q} quits.`);
        return;
      }
      throw err;
    }
    callback('NA');
    return;
  });
}

function writeData(path, matches, writeMessage) {
  var data = '';
  matches.forEach(match => {
    data += `${match}\n`;
  });
  data = data.slice(0, data.length-1);

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
