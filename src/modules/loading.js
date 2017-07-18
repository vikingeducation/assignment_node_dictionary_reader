const dictionary = require('../../data/dictionary.json');
const cli = require('./cli_interface');
//var dictionarys = { }
//display hashtable of dictionaries
//^^^^ dictionaries available


//check user input

//if incorrect, send back to init()

var FindDictionary = function (str){
  var cli = require('./cli_interface');
  str = str.trim();
  if (str === "1") {
    console.log("hello");
  }
  else {
    console.log("you suck there is no dictionary named that");
    cli.init();
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
