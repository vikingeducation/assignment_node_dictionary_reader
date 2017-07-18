const load = require('../loader');
const selectDict = require('./selectDict');
const search = require('../search');

// Recieve results from a load
function recieveDict(err, path, result) {
  if (err) {
    // Prompt user again on error
    console.log('Sorry, there was an error. Please try again.');
    selectDict(loadDict);
  } else {
    performSearch(result);
  }
}

function performSearch(dictionary) {
  console.log('Enter a word to search for: ');
  search(dictionary, displayResult);
}

function displayResult(err, dictionary, word, definition) {
  if (err) {
    console.log(err);
  } else {
    console.log('Definition:');
    console.log(`${word}: ${definition}`);
  }
  performSearch(dictionary);
}

function loadDict(path) {
  load(path, recieveDict);
}

module.exports = loadDict;
