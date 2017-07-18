const menu = require('./menu');
const loader = require('../loader');
const count = require('../frequency');

const dictionaries = { 1: './data/dictionary.json' };

// Prompt the user to select a dictionary
function init() {
  menu('Select a dictionary to load:', dictionaries, load);
}

// Attempt to load a dictionary, passs recieveDict to handle
function load(selection) {
  loader(dictionaries[selection], recieveDict);
}

// Recieve results from a load, prompt user again on error
function recieveDict(err, path, result) {
  if (err) {
    console.log('Sorry, there was an error. Please try again.');
    init();
  } else {
    console.log(`Success!`);
    console.log(`Loaded: ${path}`);
    console.log(`Words: ${Object.keys(result).length}`);
    console.log('Word frequency by starting letter:');
    const counts = count(result);
    for (let letter in counts) {
      console.log(`${letter.toUpperCase()}: ${counts[letter]}`);
    }
  }
}

module.exports = init;
