const fs = require('fs');


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


const search = {
  // exact match
  exactMatch: function(dictionaryName, searchWord) {
    fs.readFile('../data/' + dictionaryName, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      data = JSON.parse(data);
      const words = Object.keys(data);

      if (!words.includes(searchWord)) {
        console.log('No exact match found.');
      } else {
        const matches = exactMatchFilter(words, searchWord);

        console.log(`Found ${matches.length} that matched:`)
        logThis(matches);
      }
    });
  },
  // partial match
  partialMatch: function(dictionaryName, partialStr) {
    fs.readFile('../data/' + dictionaryName, (err, data) => {
      if (err) {
        throw err;
      }

      data = JSON.parse(data);
      const words = Object.keys(data);

      const partials = getPartialMatch(words, partialStr);
      console.log(`Found ${partials.length} that partially matched with: ${partialStr}`)

      logThis(partials);
    });
  },
  // "Begins with" match
  beginsWith: function(dictionaryName, searchStr) {
    fs.readFile('../data/' + dictionaryName, (err, data) => {
      if (err) {
        throw err;
      }

      data = JSON.parse(data);
      const words = Object.keys(data);

      const wordsBeginningWith = getWordsBeginningWith(words, searchStr);
      console.log(`Found ${wordsBeginningWith.length} that begins with "${searchStr}"`);

      if (wordsBeginningWith.length) {
        logThis(wordsBeginningWith);
      }
    })
  },
  // "Ends with" match
  endsWith: function(dictionaryName, endStr) {
    fs.readFile('../data/' + dictionaryName, (err, data) => {
      if (err) {
        throw err;
      }

      data = JSON.parse(data);
      const words = Object.keys(data);

      const wordsThatEndWith = getWordsThatEndWith(words, endStr);
      console.log(`Found ${wordsThatEndWith.length} that ends with ${endStr}`);

      if (wordsThatEndWith) {
        logThis(wordsThatEndWith);
      }
    });

  },
}

module.exports = search;
