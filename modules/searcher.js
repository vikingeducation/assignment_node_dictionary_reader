var fs = require('fs');
var dictionaryData = require('./dictionary_data');
var loader = require('./loader');

var searcher = {
  words: function(userInput){
    userInput = userInput.trim().toLowerCase();
    var dictPath = loader.selectedDict;

    fs.readFile(`./data/${dictPath}`, 'utf8', (err, data) => {
      if (err) throw err;
      data = JSON.parse(data);
      if (data[userInput] === undefined ){
        dictionaryData.displaySimilar(userInput, data);
      } else {
        dictionaryData.displayDefinition(userInput, data);
        console.log("\nPlease enter a word or 'q' to quit");
      }
    });
  },

  stats: function(userInput){
    userInput = userInput.trim().toLowerCase();
    var dictPath = loader.selectedDict;

    fs.readFile(`./data/${dictPath}`, 'utf8', (err, data) => {
      if (err) throw err;
      data = JSON.parse(data);
      dictionaryData.displayWordCount(data);
      dictionaryData.displayWordCountByLetter(data);
      console.log("Please enter a word or 'q' to quit");
    });
  }
}// searcher

module.exports = searcher;
