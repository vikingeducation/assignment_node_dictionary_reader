var fs = require('fs');
var loader = require('./loader.js');
var dictionary = require('./dictionary.js');

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
    });

    // start listening to STDIN
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', (data) => {
      data = data.trim();

      // Find dictionary
      var file = dictionaries[parseInt(data) - 1];

      // Exit program when user inputs 'q'
      if (data === 'q') {
        process.exit();
      } else if (file) { // user enters a valid number for a dictinary file

        // load the file and process it

        // ******** Not sure how to get it to load SYNC VS ASYNC *************

        dictionary.load(file);

      } else if (parseInt(data)) { // user enters a number that is not a dictionary
        console.log(`Invalid dictionary number: ${ data }`);
      } else {
        console.log(`Invalid input: ${ data }`);
      }
    });
  }
};
