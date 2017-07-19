// Given a dictionary, a subdictionary, and a callback
// Prompt the user for where they would like to save
// Check to see if that file exists
// If not, write the file
// If so, prompt the user to overwrite
// Either write or return to the menu

const fs = require('fs');
const writeDict = require('../io/writeDict');
const prompt = require('./prompt');
const menu = require('./menu');

function saveDict(dictionary, words, callback) {
  prompt('What filepath should we write results to?', filename => {
    fs.readdir('./data', (err, data) => {
      if (err) throw err;
      if (data.includes(filename + '.json')) {
        promptExists(filename, words, dictionary, callback);
      } else {
        writeDict(filename, words, dictionary, callback);
      }
    });
  });
}

function promptExists(filename, words, dictionary, callback) {
  menu('File exists. Overwrite?', { y: 'Yes', n: 'No' }, choice => {
    if (choice === 'y') {
      writeDict(filename, words, dictionary, callback);
    } else {
      callback(dictionary);
    }
  });
}

module.exports = saveDict;
