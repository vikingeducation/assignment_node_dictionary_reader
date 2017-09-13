const fs = require('fs');
const Ui = require('./cliui');
const Saver = require('./saving');

const Searcher = {

  searchListener: function(num, selectedFile){

    console.log('Enter your search terms:')

    var onData = function(word){

      word = word.trim();

      var regex = /[a-z]/gi
      var match = regex.exec(word);
      if (match) {
        if (num == 1) {
          Searcher.exact(word, selectedFile);
          process.stdin.removeListener('data', onData);
        }
        else if (num == 2) {
          Searcher.partial(word, selectedFile);
          process.stdin.removeListener('data', onData);
        }
        else if (num == 3) {
          Searcher.beginsWith(word, selectedFile);
          process.stdin.removeListener('data', onData);
        }
        else if (num == 4) {
          Searcher.endsWith(word, selectedFile);
          process.stdin.removeListener('data', onData);
        }
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
      matchResults = `

${word}:  ${results[word]}

      `;//this looks weird because the of the weird formatting i was getting when savign a file
      //but the formatting is still kinda weird
      console.log(matchResults);
      Saver.saverUi(selectedFile, matchResults);
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
      var matchResultsArr = [];
      for (var key in results) {
        var matcher = regex.test(key);
        if (matcher) {
          matchResults = (`

${key}
${results[key]}

          `)
          console.log(matchResults);
          matchResultsArr.push(matchResults);
        }
      }
      Saver.saverUi(selectedFile, matchResultsArr);
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
      var matchResultsArr = [];
      for (var key in results) {
        var matcher = regex.test(key);
        if (matcher) {
          var matchResults = (`

${key}
${results[key]}

          `)
          console.log(matchResults);
          matchResultsArr.push(matchResults);
        }
      }
      Saver.saverUi(selectedFile, matchResultsArr);
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
      var matchResultsArr = [];
      for (var key in results) {
        var matcher = regex.test(key);
        if (matcher) {
          matchResults = (`

${key}
${results[key]}

          `)
          console.log(matchResults);
          matchResultsArr.push(matchResults);
        }
      }
      Saver.saverUi(selectedFile, matchResultsArr);
    })
    .catch((error) => {
      console.error(error);
    })
  }

};

module.exports = Searcher;
