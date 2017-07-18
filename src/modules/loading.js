const dictionary = require('../../data/dictionary.json');
const cli = require('./cli_interface');
var selectedDictionary;

var displayDictionaries = function() {
  console.log("Select a dictionary...");
  console.log("1. Dictionary");
}

var FindDictionary = function (str){
  str = str.trim();
  if (str === "1") {
    console.log("Sucessfully loaded your dictionary!");
   var selectedDictionary = dictionary;
   console.log("Word count: " + Object.keys(selectedDictionary).length);
   letterFrequency(selectedDictionary);
   return true;
  }
  else {
    console.log("Invalid Response");
    return false;
  }
}

var letterFrequency = function(dict) {
  var letterFrequencyObj = {
  }
var dictword = Object.keys(dict);
  for(i=0; i<dictword.length; i++) {
    var word = dictword[i];
    var firstLetter = word[0];

    if (letterFrequencyObj[firstLetter] === undefined) {
      letterFrequencyObj[firstLetter] = 1;
    }
    else {
        letterFrequencyObj[firstLetter] += 1;
      }
    }
DisplayWordCount(letterFrequencyObj);
    return letterFrequencyObj;
}

var DisplayWordCount = function(wordCount){
  for (var k in wordCount) {
      if (wordCount.hasOwnProperty(k)) {
        console.log(wordCount[k] + " words with " + k );
      }
  }
}

module.exports =
{ "FindDictionary": FindDictionary,
"displayDictionaries": displayDictionaries}
