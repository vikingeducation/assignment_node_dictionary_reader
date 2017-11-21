var fs = require('fs');
var dictData = require('./dictData');

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


// Load array of dictionary files from data folder
var dictFileArray = load.displayFiles('../assignment_node_dictionary_reader/data/dictionaries/');

var parseDictionary = (dictionaryBuf) => {
  // Convert dictionary buffer to string
  var currentDictionaryJSON = dictionaryBuf.toString();
  var currentDictionary = JSON.parse(currentDictionaryJSON);
  var currentDictionaryKeys = Object.keys(currentDictionary).join(', ');
  var totalWords = Object.keys(currentDictionary).length;
  var wordCountByLetterArray = dictData.countWordsByLetter(currentDictionary);

  var letterStr = '';
  for(var i = 0; i <= (wordCountByLetterArray.length - 1); i++) {
    var formattedCount = wordCountByLetterArray[i].currentLetter + ': ' + wordCountByLetterArray[i].letterCount + '\n';
    letterStr += formattedCount;
  }

  var dictionary = {
    JSONStr: currentDictionaryJSON,
    object: currentDictionary,
    keys: currentDictionaryKeys,
    totalWords: totalWords,
    wordCountByLetter: letterStr
  };

  return dictionary;

// ends parseDictionary
};

module.exports = {
  load,
  dictFileArray,
  parseDictionary
};
