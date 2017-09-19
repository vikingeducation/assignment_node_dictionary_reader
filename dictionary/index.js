var fs = require('fs');
var chalk = require('chalk');
var loader = require('./loader');
var dictionary = require('./dictionary');
var searcher = require('./searcher');

var dictionaries = loader.dictionaries;

var welcomeUser = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('./data/welcome.txt', 'utf8', (err, data) => {
      if (err) throw err;
      // Display welcome message
      console.log(data);
      resolve();
    });
  });
};

var promptForDictionary = () => {
  // Give JSON dictionary options
  console.log("Select a dictionary to load:");

  // display numbered file names
  for (i = 0; i < dictionaries.length; i++) {
    console.log(`${ i + 1 }. ${dictionaries[i]}`);
  }

  process.stdout.write('> ');

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
    } else if (file) { // user enters a valid number for a dictionary file

    // load the file and get word information
      dictionary.load(file)
        .then((dictionary) => {
          // Start searcher
          searcher.initSearch(dictionary);
        });
    } else if (parseInt(data)) { // user enters a number that is not a dictionary
      console.log(chalk.red(`\nInvalid dictionary number: ${ data }\n\n`));
      // Ask for dictionary again
      promptForDictionary();
    } else {
      console.log(chalk.red(`\nInvalid input: ${ data }\n\n`));
      // Ask for dictionary again
      promptForDictionary();
    }
  });
};

welcomeUser()
  .then(() => {
    promptForDictionary();
  });
