var fs  = require('fs');

var loader = {
  availableFiles: {}
}

loader.readFiles = (directory) => {
  // console.log("called");
  fs.readdir(directory, (err, data) => {
    if (err) {
      console.log('error');
      throw err;
    }
    console.log('called');
    loader.listAvailableDictionaries(data);
  });
}

loader.listAvailableDictionaries = (data) => {
  data.forEach( (file, index, data) => {
    console.log(`${index+1}: ${file}`);
  });
}

loader.isValidInput = (choice) => {
  return true;
}

loader.chooseDictionary = (choice) => {
  console.log("choose dictionaryies function ran");
}


module.exports = loader;
