var fs = require('fs');
var chalk = require('chalk');
var saver = require('./saver.js');

var searchResults;

var processWords = (file, matches, searchType) => {
  if (matches.length === 0) {
    console.log(chalk.red('\nNo matches found.'));
    initSearch(searchType, file);
  } else {
    console.log(chalk.green(`\nFound ${ matches.length } matches:`));
    matches.forEach((word) => {
      console.log(word);
    });
  }
};

var initSearch = (searchType, file) => {

  process.stdout.write('\nEnter the search term:\n> ');

  process.stdin.once('data', (data) => {
    data = data.trim();

    if (data === 'q') {
      process.exit();
    } else if (/[^a-z]+/g.test(data)) {

      // Log error
      console.log(chalk.red('\nYou must enter a valid search term without numbers'));

      // re-ask for input
      initSearch(searchType, file);

    } else { // Perform search on valid input
      var search = searchPhrase(file, data, searchType);
      search.then(() => {
        if (searchResults.length !== 0) {
          saver.init(file, searchResults);
        }
      });
    }
  });
};

var searchPhrase = (file, phrase, searchType) => {
  var performSearch = new Promise((resolve, reject) => {
    fs.readFile(`./data/${ file }`, 'utf8', (err, data) => {
      if (err) throw err;

      phrase = phrase.toLowerCase();
      var dictionary = JSON.parse(data);
      var words = Object.keys(dictionary);

        switch(searchType) {
          // When exact
          case '1':
            searchResults = words.filter(word => phrase === word);
            break;
          // When partial
          case '2':
            searchResults = words.filter(word => word.includes(phrase));
            break;
          // When befins with
          case '3':
            searchResults = words.filter(word => word.startsWith(phrase));
            break;
          // When ends with
          case '4':
            searchResults = words.filter(word => word.endsWith(phrase));
            break;
        }

      processWords(file, searchResults, searchType);
      resolve();
    });
  });

  return performSearch;
};

module.exports = {
  init: (file) => {
    process.stdin.resume();

    // Prompt user for search type
    process.stdout.write('\n');
    console.log("What kind of search?");
    console.log('1: Exact');
    console.log('2: Partial');
    console.log('3: Starts with');
    console.log('4: Ends with');
    process.stdout.write('> ');

    process.stdin.once('data', (data) => {
      data = data.trim();

      if (data === 'q') {
        process.exit();
      } else if (!['1','2','3','4'].includes(data)) { // Is not a number 1 - 4
        process.stdout.write(chalk.red('\n\nYou must enter a number for the search type.\n\n'));
        module.exports.init(file);
      } else {
        var searchType = data;

        initSearch(searchType, file);
      }
    });
  }
};
