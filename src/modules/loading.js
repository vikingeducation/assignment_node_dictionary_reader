const dictionary = require('../../data/dictionary.json');
const cli = require('./cli_interface');
var selectedDictionary;

//var dictionarys = { }
//display hashtable of dictionaries
//^^^^ dictionaries available


//check user input

//if incorrect, send back to init()

var FindDictionary = function (str){
  str = str.trim();
  if (str === "1") {
    console.log("Sucessfully loaded your dictionary!");
   var selectedDictionary = dictionary;
   console.log("Word count: " + Object.keys(selectedDictionary).length);
   console.log(letterFrequency(selectedDictionary));
   return true
  }
  else {
    console.log("you suck there is no dictionary named that");
    return false
    //cli.init();
  }

//if str is a dictionary load that dictionary
//then send it back to cli interface for search term
//display Successfully loaded: dictionary.json
// Word count: 12345
// Word frequency by starting letter:
// A: 123
// B: 456

}

var letterFrequency = function(dict) {
  var letterFrequencyObj = {
    "a": 0,
    "b": 0,
    "c": 0
  }
  for(i=0;i<Object.keys(dict).length;i++) {
    var word = dict[i];
    var firstLetter = word[0].toString();
    if (firstLetter === undefined) {
      letterFrequencyObj[dict[i]] = 1;
    }
    else {
      letterFrequencyObj.firstLetter += 1;
    }
    console.log(word + firstLetter + letterFrequencyObj);
  }

  return letterFrequencyObj;
}


module.exports = { "FindDictionary": FindDictionary}
