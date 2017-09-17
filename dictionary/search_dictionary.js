var fs = require('fs');

var processWords = (file, matches, searchType) => {
  if (matches.length === 0) {
    console.log('\nNo matches found.');
    initSearch(searchType, file);
  } else {
    console.log(`\nFound ${ matches.length } matches:`);
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
      console.log('\nYou must enter a valid search term without numbers');

      // re-ask for input
      initSearch(searchType, file);

    } else { // Perform search on valid input
      switch(searchType) {
        case '1':
          searches.exact(file, data);
          break;
        case '2':
          searches.partial(file, data);
          break;
        case '3':
          searches.beginsWith(file, data);
          break;
        case '4':
          searches.endsWith(file, data);
          break;
      }
    }
  });
};

var searches = {
  exact: (file, phrase) => {
    fs.readFile(`./data/${ file }`, 'utf8', (err, data) => {
      if (err) throw err;

      phrase = phrase.toLowerCase();
      var dictionary = JSON.parse(data);
      var words = Object.keys(dictionary);

      matches = words.filter(word => phrase === word);

      processWords(file, matches, '1');
    });
  },

  partial: (file, phrase) => {
    fs.readFile(`./data/${ file }`, 'utf8', (err, data) => {
      if (err) throw err;

      phrase = phrase.toLowerCase();
      var dictionary = JSON.parse(data);
      var words = Object.keys(dictionary);

      matches = words.filter(word => word.includes(phrase));

      processWords(file, matches, '2');
    });
  },

  beginsWith: (file, phrase) => {
    fs.readFile(`./data/${ file }`, 'utf8', (err, data) => {
      if (err) throw err;

      phrase = phrase.toLowerCase();
      var dictionary = JSON.parse(data);
      var words = Object.keys(dictionary);

      matches = words.filter(word => word.startsWith(phrase));

      processWords(file, matches, '3');
    });
  },

  endsWith: (file, phrase) => {
    fs.readFile(`./data/${ file }`, 'utf8', (err, data) => {
      if (err) throw err;

      phrase = phrase.toLowerCase();
      var dictionary = JSON.parse(data);
      var words = Object.keys(dictionary);

      matches = words.filter(word => word.endsWith(phrase));

      processWords(file, matches, '4');
    });
  }
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
      } else if (![1,2,3,4].includes(parseInt(data))) { // Is not a number 1 - 4
        process.stdout.write('\n\nYou must enter a number for the search type.\n\n');
        module.exports.init(file);
      } else {
        var searchType = data;

        initSearch(searchType, file);
      }
    });
  }
};
