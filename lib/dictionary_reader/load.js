const fs = require('fs');
const path = './data';

const isJSON = (file) => {
  let JSONregex = /(.)+\.json/;
  return JSONregex.test(file);
};

let _dictionaries = [];

const listDictionaries = () => {
  fs.readdir(path, (err, data) => {
    if (err) throw err;

    // iterates through results and checks if each element is a JSON file
    data.forEach((file, i) => {
      if(isJSON(file)){

        // saves result to a dictionary array to access later
        _dictionaries.push(file);
        // makes display not zero-indexed
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

module.exports = {
  listDictionaries: listDictionaries,
  isDictionary: isDictionary,
}