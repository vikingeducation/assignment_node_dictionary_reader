var fs  = require('fs');

var loader = {};

loader.readFiles = (directory) => {
  fs.readdir(directory, (err, data) => {
    if (err) {
      console.log('error');
      throw err;
    }
    loader.listAvailableDictionaries(data);
  });
}

loader.listAvailableDictionaries = (data) => {
  data.forEach( (file, index, data) => {
    console.log(`${index+1}: ${file}`);
  });
}

loader.isValidInput = (choice) => {
  var possibleFiles =
  return true;
}

loader.chooseDictionary = (choice) => {
  console.log("choose dictionaryies function ran");
}

loader.loadDictionary(choice) => {
  throw(err);
}


module.exports = loader;
