const fs = require('fs');
const dirPath = './data';

const isJSON = (file) => {
  let JSONregex = /(.)+\.json/;
  return JSONregex.test(file);
};

let _dictionaries = [];

const listDictionaries = () => {
  fs.readdir(dirPath, (err, data) => {
    if (err) throw err;

    // iterates through results and checks if each element is a JSON file
    data.forEach((file, i) => {
      if(isJSON(file)){

        // saves result to a dictionary array to access later
        _dictionaries.push(file);
        // display non zero-indexed directory contents
        console.log(`${ i + 1 }. ${ file }`);
      }
    });
  });
};

const isDictionary = (input) => {
  // converts user input to zero index format
  input -= 1;

  return _dictionaries[input];
};

const openDictionary = (input) => {
  let path = `${ dirPath }/${ _dictionaries[input - 1]}`;

  var readStream = fs.createReadStream(path, 'utf8');

  readStream.on('data', (data) => {
  });

  readStream.on('end', () => {
    console.log("Dictionary finished loading!");
  });
};

module.exports = {
  listDictionaries: listDictionaries,
  isDictionary: isDictionary,
  openDictionary: openDictionary
}