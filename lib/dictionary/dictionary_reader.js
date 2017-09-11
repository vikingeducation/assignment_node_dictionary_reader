
const fs = require('fs');

const dictionary_reader = {

  loadItUp: function(selectedFile) {

    return new Promise( function(resolve, reject) {

      console.log(`

        ====================
        loading a dictionary

        `);

      var path = `data/${selectedFile}`

      fs.readFile(path, 'utf8', function(err, data) {
        if (err) reject(err);

        data = JSON.parse(data.toString());
        resolve(dictionary_reader.printDictionaryData(data, selectedFile));

      });

    })

  },// end loadItUp


  printDictionaryData: function(data, selectedFile){
    var numberOfWords = Object.keys(data).length;

    console.log(`
      We successfully loaded  ${selectedFile}

      Word Count: ${numberOfWords}

      `);

  }

}//end dictionary_reader

module.exports = dictionary_reader;
