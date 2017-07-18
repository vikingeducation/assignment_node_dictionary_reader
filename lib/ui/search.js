const load = require('../loader');
const selectDict = require('./selectDict');
const search = require('../search');
const menu = require('./menu');

// Recieve results from a load
function recieveDict(err, path, result) {
  if (err) {
    // Prompt user again on error
    console.log('Sorry, there was an error. Please try again.');
    selectDict(loadDict);
  } else {
    displayMenu(result);
  }
}

function performSearch(dictionary, callback) {
  console.log('Enter a word to search for: ');
  callback(dictionary, displayResult);
}

function displayResult(err, dictionary, word, definition) {
  if (err) {
    console.log(err);
  } else {
    console.log('Definition:');
    console.log(`${word}: ${definition}`);
  }
  displayMenu(dictionary);
}

function loadDict(path) {
  load(path, recieveDict);
}

function displayMenu(dictionary) {
  menu("Search Menu", {
    "f": "Full Text Search",
    "q": "Quit"
  }, (result) => {
    switch (result) {
      case "f":
        performSearch(dictionary, search);
        break;
      case "q":
        process.exit();
    }
  })
}

module.exports = loadDict;
