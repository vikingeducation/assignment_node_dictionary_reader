var fs  = require('fs');

var loader = {

  readFiles: (directory) => {
    fs.readdir(directory, (err, data) => {
      if (err) {
        throw err;
      }
      loader.listAvailableDictionaries(data);
    });
  },

  listAvailableDictionaries: (data) => {
    data.forEach( (file, index, data) => {
      console.log(`${index+1}: ${file}`);
    });
  }
}

module.exports = loader;
