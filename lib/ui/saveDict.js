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
        promptExists(filename, dictionary, words, callback);
      } else {
        writeDict(filename, dictionary, words, callback);
      }
    });
  });
}

function promptExists(filename, dictionary, words, callback) {
  menu('File exists. Overwrite?', { y: '', n: '' }, choice => {
    if (choice === 'y') {
      writeDict(filename, dictionary, words, callback);
    } else {
      callback(dictionary);
    }
  });
}

module.exports = saveDict;
