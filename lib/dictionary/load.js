var fs = require('fs');

var load = {
  // Creates fileArray for a given path
  displayFiles: (path) => {
    var fileArray = fs.readdirSync(path);
    return fileArray;
  },

  // Reads dictionary into memory
  readDictionary: (path) => {
    var fileContents = fs.readFileSync(path);
    return fileContents;
  }
};

var bufToStr = (dictBuffer) => {
  var str = dictBuffer.toString();
  return str;
};

// Load array of dictionary files from data folder
var dictFileArray = load.displayFiles('../assignment_node_dictionary_reader/data');

// var getCurrentDict = ();

module.exports = {
  load,
  dictFileArray,
  // getCurrentDict,
  bufToStr
};
