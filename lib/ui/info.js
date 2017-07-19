// Given a file path and dictionary object
// Display some information about them

const selectDict = require('./selectDict');
const count = require('../frequency');

// Recieve results from a load
function displayInfo(path, result) {
  // Display results
  console.log(`Success!`);
  console.log(`Loaded: ${path}`);
  console.log(`Words: ${Object.keys(result).length}`);
  console.log('Word frequency by starting letter:');
  const counts = count(result);
  for (let letter in counts) {
    console.log(`${letter.toUpperCase()}: ${counts[letter]}`);
  }
}

module.exports = displayInfo;
