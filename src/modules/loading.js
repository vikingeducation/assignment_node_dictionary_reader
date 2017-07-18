const dictionary = require('../../data/dictionary.json');
const dictData = require('./dictionary_data')
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
   dictData.letterFrequency(selectedDictionary);
   dictData.SetData(selectedDictionary); 


   return true;
  }
  else {
    console.log("Invalid Response");
    return false;
  }
}


module.exports =
{ "FindDictionary": FindDictionary,
"displayDictionaries": displayDictionaries}
