var fs = require('fs');
var dictionaryData = require('./dictionary_data');

function searcher(userInput){
  userInput = userInput.trim().toLowerCase();
  fs.readFile(dictionaryData.textPath, 'utf8', (err, data) => {
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
