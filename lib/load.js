const fs = require('fs');

//create a readStream

let dicts = {
    getDicts: function(callback) {
        fs.readdir('../data', function(err, data) {
            if (err) throw err;
            callback(data);
        });
    },

    getFile: function (fileName, callback) {
      const dict = require('../data/' + fileName);
      console.log ("Successfully loaded: " + fileName);

      let wordCount = 0;
      let wordCountStarting = {};

      for (let word in dict) {
        wordCount ++;
        if (word[0] in wordCountStarting) wordCountStarting[word[0]] ++;
        else wordCountStarting[word[0]] = 1;
      }
      console.log ("Word count: " + wordCount);
      console.log ("Word frequency by starting letter: ");
      for (let letter in wordCountStarting) {
        console.log (letter.toUpperCase() + ": " + wordCountStarting[letter]);
      }
      callback();
      return dict;
    }
}

module.exports = dicts;
