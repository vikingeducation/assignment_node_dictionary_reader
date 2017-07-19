// Given a file, subdictionary, dictionary, and callback
// Write the subdictionary into the file
// Pass the dictionary into the callback

const fs = require('fs');

function writeFile(filename, words, dictionary, callback) {
  fs.writeFile(`./data/${filename}.json`, JSON.stringify(words), err => {
    if (err) {
      console.log(`Warning: ${err}`);
    } else {
      console.log('File successfully written.');
    }

    callback(dictionary);
  });
}

module.exports = writeFile;
