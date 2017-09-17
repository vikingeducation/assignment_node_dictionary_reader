var fs = require('fs');
var loader = require('./loader.js');
var dictionary = require('./dictionary.js');
var searcher = require('./search_dictionary.js');

var dictionaries = loader.dictionaries;

module.exports = {
  init: () => {
    fs.readFile('./data/welcome.txt', 'utf8', (err, data) => {
      if (err) throw err;
      // Display welcome message
      console.log(data);

      // Give JSON dictionary options
      console.log("Select a dictionary to load:");

      // display numbered file names
      for (i = 0; i < dictionaries.length; i++) {
        console.log(`${ i + 1 }. ${dictionaries[i]}`);
      }

      process.stdout.write('> ');
    });

    // start listening to STDIN
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.once('data', (data) => {
      data = data.trim();

      // Find dictionary
      var file = dictionaries[parseInt(data) - 1];

      // Exit program when user inputs 'q'
      if (data === 'q') {
        process.exit();
      } else if (file) { // user enters a valid number for a dictinary file

        // load the file and get word information
        // ******** Not sure how to get it to load SYNC VS ASYNC *************
        var load = dictionary.load(file);

        load.then(() => {
          process.stdin.pause();

          // Start searcher
          searcher.init(file);
        });
      } else if (parseInt(data)) { // user enters a number that is not a dictionary
        console.log(`Invalid dictionary number: ${ data }`);
      } else {
        console.log(`Invalid input: ${ data }`);
      }
    });
  }
};
