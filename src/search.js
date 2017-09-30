const fs = require('fs');
const saveResults = require('./save-results.js');
const colorize = require('./colors.js');


function logThis(arr) {
  arr.forEach((el) => {
    console.log(el);
  });
}

function exactMatchFilter(words, searchWord) {
  // return new array of exact matched words
  const matches = words.filter((word) => {
    if (word === searchWord) {
      return word;
    }
  });

  return matches;
}

function getPartialMatch(words, partialStr) {
  const matchesPartially = [];

  words.forEach((word) => {
    new RegExp(partialStr, 'gi').test(word) ? matchesPartially.push(word) : null
  });

  return matchesPartially;
}

function getWordsBeginningWith(words, searchStr) {
  const end = searchStr.length;

  const beginsWith = words.filter((word) => {
    if (word.slice(0, end) === searchStr) {
      return word;
    }
  });

  return beginsWith;
}

function getWordsThatEndWith(words, endStr) {
  const start = -endStr.length;

  const wordsEndingWith = words.filter((word) => {
    if (word.slice(start) === endStr) {
      return word;
    }
  });

  return wordsEndingWith;
}

function yesNoListener(input) {
  input = input.trim();
  process.removeListener('data', yesNoListener);

  switch (input) {
    case 'y':
      console.log('\nWhat path should we write to?');
      process.stdin.on('data', filePath);
      break;
    case 'n':
      console.log('\nResults not saved');
      process.exit();
      break;
    case 'q':
      console.log('\nGoodbye.');
      process.exit();
      break;
    default:
      console.log(`\nInvalid input: ${input}`);
  }
}

function filePath(path) {
  path = path.trim();

  saveResults.save(path, saveWords);
}


let saveWords;

const search = {
  // exact match
  exactMatch: function(dictionaryName, searchWord) {
    fs.readFile('./data/' + dictionaryName, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      data = JSON.parse(data);
      const words = Object.keys(data);

      if (!words.includes(searchWord)) {
        console.log('No exact match found.');
      } else {
        const matches = exactMatchFilter(words, searchWord);
        saveWords = matches;

        console.log(`\nFound ${matches.length} that matched:`)
        logThis(matches);

        process.stdin.removeAllListeners('data');
        console.log(`Do you want to save the results? ${colorize.green('y')}/${colorize.red('n')}? "q" to quit.`);
        process.stdin.on('data', yesNoListener);
      }
    });
  },
  // partial match
  partialMatch: function(dictionaryName, partialStr) {
    fs.readFile('./data/' + dictionaryName, (err, data) => {
      if (err) {
        throw err;
      }

      data = JSON.parse(data);
      const words = Object.keys(data);

      const partials = getPartialMatch(words, partialStr);
      saveWords = partials;
      console.log(`\nFound ${partials.length} that partially matched with: ${partialStr}`)

      logThis(partials);

      process.stdin.removeAllListeners('data');
      console.log(`Do you want to save the results? ${colorize.green('y')}/${colorize.red('n')}? "q" to quit.`);
      process.stdin.on('data', yesNoListener);

    });
  },
  // "Begins with" match
  beginsWith: function(dictionaryName, searchStr) {
    fs.readFile('./data/' + dictionaryName, (err, data) => {
      if (err) {
        throw err;
      }

      data = JSON.parse(data);
      const words = Object.keys(data);

      const wordsBeginningWith = getWordsBeginningWith(words, searchStr);
      saveWords = wordsBeginningWith;
      console.log(`\nFound ${wordsBeginningWith.length} that begins with "${searchStr}"`);

      if (wordsBeginningWith.length) {
        logThis(wordsBeginningWith);
      }

      process.stdin.removeAllListeners('data');
      console.log(`Do you want to save the results? ${colorize.green('y')}/${colorize.red('n')}? "q" to quit.`);
      process.stdin.on('data', yesNoListener);
    })
  },
  // "Ends with" match
  endsWith: function(dictionaryName, endStr) {
    fs.readFile('./data/' + dictionaryName, (err, data) => {
      if (err) {
        throw err;
      }

      data = JSON.parse(data);
      const words = Object.keys(data);

      const wordsThatEndWith = getWordsThatEndWith(words, endStr);
      saveWords = wordsThatEndWith;
      console.log(`\nFound ${wordsThatEndWith.length} that ends with ${endStr}`);

      if (wordsThatEndWith) {
        logThis(wordsThatEndWith);
      }

      process.stdin.removeAllListeners('data');
      console.log(`Do you want to save the results? ${colorize.green('y')}/${colorize.red('n')}? "q" to quit.`);
      process.stdin.on('data', yesNoListener);
    });

  },
}

module.exports = search;
