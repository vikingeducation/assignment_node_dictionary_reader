const fs = require('fs');
const cli_ui = require('./cli_ui');

const Searcher = {

  searchListener: function(num, selectedFile){

    console.log('Enter your search terms:')

    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    var onData = function(word){

      word = word.trim();

      var regex = /[a-z]/gi
      var match = regex.exec(word);
      if (match) {
        if (num == 1) { Searcher.exact(word, selectedFile); }
        else if (num == 2) { Searcher.partial(word, selectedFile); }
        else if (num == 3) { Searcher.beginsWith(word, selectedFile); }
        else if (num == 4) { Searcher.endsWith(word, selectedFile); }
        else { console.log('invalid word') };
      }

      else {
        console.log(`invalid input: ${word}`)
      }
    }//end ondata

    process.stdin.on('data', onData);

  },// end searchListener


  fileReader: function(selectedFile) {

    return new Promise(function(resolve, reject) {

      var path = `data/${selectedFile}`;
      fs.readFile(path, 'utf8', (err, data) => {
        if (err) { reject(err) };
        data = JSON.parse(data.toString());
        resolve(data);
      });

    })

  },


  exact: function(word, selectedFile) {
    console.log(`Searching exactly:`);
    var matchResults;
    Searcher.fileReader(selectedFile)
    .then((results) => {
      matchResults = results[word];
      console.log(matchResults);
      cli_ui.saverUi(selectedFile, matchResults);//not a function
      process.stdin.pause();
    })
    .catch((error) => {
      console.error(error);
    })
  },


  partial: function(word, selectedFile) {
    console.log(`Searching partially:`)
    var matchResults;
    Searcher.fileReader(selectedFile)
    .then((results) => {
      var regex = new RegExp(word, 'ig')
      //https://stackoverflow.com/questions/10758112/loop-through-object-get-value-using-regex-key-matches-javascript
      for (var key in results) {
        var matcher = regex.test(key);
        if (matcher) {
          matchResults = (`
          ${key}
          ${results[key]}

          `)
          console.log(matchResults)

        }
      }
    })
    .catch((error) => {
      console.error(error);
    })

  },


  beginsWith: function(word, selectedFile) {
    console.log(`Searching begins with:`)
    var matchResults;
    Searcher.fileReader(selectedFile)
    .then((results) => {
      var regex = new RegExp('^' + word, 'ig')
      //https://stackoverflow.com/questions/10758112/loop-through-object-get-value-using-regex-key-matches-javascript
      for (var key in results) {
        var matcher = regex.test(key);
        if (matcher) {
          matchResults = (`
          ${key}
          ${results[key]}

          `)
          console.log(matchResults)
        }
      }
    })
    .catch((error) => {
      console.error(error);
    })
  },


  endsWith: function(word, selectedFile) {
    console.log(`Searching ends with:`)
    var matchResults;
    Searcher.fileReader(selectedFile)
    .then((results) => {
      var regex = new RegExp(word + '$', 'ig')
      //https://stackoverflow.com/questions/10758112/loop-through-object-get-value-using-regex-key-matches-javascript
      for (var key in results) {
        var matcher = regex.test(key);
        if (matcher) {
          matchResults = (`
          ${key}
          ${results[key]}

          `)
          console.log(matchResults)

        }
      }
    })
    .catch((error) => {
      console.error(error);
    })
  }

};

module.exports = Searcher;
