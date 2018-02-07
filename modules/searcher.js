var fs = require('fs');
var dictionaryData = require('./dictionary_data');
var loader = require('./loader');

function searcher(userInput){
  userInput = userInput.trim().toLowerCase();
  var dictPath = loader.dictPath;

  fs.readFile(dictPath, 'utf8', (err, data) => {
      if (err) throw err;
      data = JSON.parse(data);

      if (data[userInput] === undefined ){

        dictionaryData.displaySimilar(userInput, data);

      } else {

        dictionaryData.displayDefinition(userInput, data);

      }
    });

}

module.exports = searcher;
