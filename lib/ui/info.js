const load = require('../loader');
const selectDict = require('./selectDict');

// Recieve results from a load
function recieveDict(err, path, result) {
  if (err) {
    // Prompt user again on error
    console.log('Sorry, there was an error. Please try again.');
    selectDict(loadDict);
  } else {
    // Display results
    console.log(`Success!`);
    console.log(`Loaded: ${path}`);
    console.log(`Words: ${Object.keys(result).length}`);
    console.log('Word frequency by starting letter:');
    const counts = count(result);
    for (let letter in counts) {
      console.log(`${letter.toUpperCase()}: ${counts[letter]}`);
    }
    console.log("")

  }
}


function loadDict(path) {
  load(path, recieveDict);
}


module.exports = loadDict;
