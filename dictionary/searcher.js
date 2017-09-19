var fs = require('fs');
var chalk = require('chalk');
var saver = require('./saver');

var processWords = (dictionary, matches, searchType) => {
  if (matches.length === 0) {
    console.log(chalk.red('\nNo matches found.'));
    search(searchType, dictionary);
  } else {
    console.log(chalk.green(`\nFound ${ matches.length } matches:`));
    matches.forEach((word) => {
      console.log(word);
    });
  }
};

var searchPhrase = (dictionary, phrase, searchType) => {

  phrase = phrase.toLowerCase();
  var words = Object.keys(dictionary);
  var searchResults;

  switch(searchType) {
    // When exact
    case '1':
      searchResults = words.filter(word => phrase === word);
      break;
    // When partial
    case '2':
      searchResults = words.filter(word => word.includes(phrase));
      break;
    // When begins with
    case '3':
      searchResults = words.filter(word => word.startsWith(phrase));
      break;
    // When ends with
    case '4':
      searchResults = words.filter(word => word.endsWith(phrase));
      break;
  }

  processWords(dictionary, searchResults, searchType);
  return searchResults;
};

var search = (searchType, dictionary) => {

  process.stdout.write('\nEnter the search term:\n> ');

  process.stdin.once('data', (searchTerm) => {
    searchTerm = searchTerm.trim();

    if (searchTerm === 'q') {
      process.exit();
    } else if (/[^a-zA-Z]+/g.test(searchTerm)) {

      // Log error
      console.log(chalk.red('\nYou must enter a valid search with only letters.'));

      // re-ask for input
      search(searchType, dictionary);

    } else { // Perform search on valid input
      var searchResults = searchPhrase(dictionary, searchTerm, searchType);

      if (searchResults.length !== 0) {
        saver.init(dictionary, searchResults);
      }
    }
  });
};

var Searcher = {
  initSearch: (dictionary) => {
    process.stdin.resume();

    // Prompt user for search type
    process.stdout.write('\n');
    console.log("What kind of search?");
    console.log('1: Exact');
    console.log('2: Partial');
    console.log('3: Starts with');
    console.log('4: Ends with');
    process.stdout.write('> ');

    process.stdin.once('data', (searchType) => {
      searchType = searchType.trim();

      if (searchType === 'q') {
        process.exit();
      } else if (!['1','2','3','4'].includes(searchType)) { // Is not a number 1 - 4
        process.stdout.write(chalk.red('\n\nYou must enter a number for the search type.\n\n'));
        Searcher.initSearch(dictionary);
      } else {
        search(searchType, dictionary);
      }
    });
  }
};

module.exports = Searcher;
