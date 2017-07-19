const selectDict = require('./selectDict');
const count = require('../frequency');

// Recieve results from a load
function displayInfo(err, path, result) {
  if (err) {
    // Prompt user again on error
    console.log('Sorry, there was an error. Please try again.');
    selectDict(displayInfo);
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
    console.log('');
  }
}

module.exports = displayInfo;
