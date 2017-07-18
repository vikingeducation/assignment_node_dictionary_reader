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
    console.log("hello");

   var selectedDictionary = JSON.stringify(dictionary);
   console.log(selectedDictionary[0]);

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
module.exports = { "FindDictionary": FindDictionary}
