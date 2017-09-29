const fs = require('fs');
const getSummary = require('./dictionary.js');

function getJSON() {
  // get list of all files in data folder
  // filter out only .json files
  // return array of .json files
  fs.readdir('./data', (err, files) => {
    if (err) {
      throw err;
    }

    console.log('Select a dictionary to load:');
    getDictionaries(files)
  });


}

function getDictionaries(files) {
  process.stdin.resume();

  // filter array to only include .json files
  // return array of .json files
  const jsonFiles = files.filter((file) => {
    return file.includes('.json');
  });

  jsonFiles.forEach((file, idx) => {
    console.log(`${idx + 1}: ${file}`);
  });


  function filterDictionaries(input) {
    input = input.trim();
    const idx = parseInt(input) - 1;

    if (input === 'q') {
      console.log('Goodbye');
      process.exit();
    } else if (idx <= jsonFiles.length - 1) {
      process.stdin.removeListener('data', filterDictionaries);
      getSummary(jsonFiles[idx]);
    } else {
      console.log(`Invalid input: ${input}`);
    }
  }

  process.stdin.on('data', filterDictionaries);
}

module.exports = getJSON;
