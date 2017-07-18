const load = require('../loader');
const selectDict = require('./selectDict');

// Recieve results from a load
function recieveDict(err, path, result) {
  if (err) {
    // Prompt user again on error
    console.log('Sorry, there was an error. Please try again.');
    selectDict(loadDict);
  } else {
    console.log("Enter a word to search for: ");


  }
}


function loadDict(path) {
  load(path, recieveDict);
}


module.exports = loadDict;
