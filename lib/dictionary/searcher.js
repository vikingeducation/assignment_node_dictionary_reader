const fs = require('fs');

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
        console.log('hey')
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
      console.log(selectedFile + 'selectedFile');//the problem is selectedFile is undefined
      fs.readFile(path, 'utf8', (err, data) => {
        if (err) { reject(err) };

        data = JSON.parse(data.toString());
        resolve(data);
      });
    })

  },


  exact: function(word, selectedFile) {
    console.log(`Searching exactly:`)
    Searcher.fileReader(selectedFile)
    .then((results) => {
      console.log(results[word]);
    })
    .catch((error) => {
      console.error(error);
    })
  },


  partial: function() {
    console.log(`Searching partially:`)
  },


  beginsWith: function() {
    console.log(`Searching begins with:`)
  },


  endsWith: function() {
    console.log(`Searching ends with:`)
  }

};

module.exports = Searcher;
