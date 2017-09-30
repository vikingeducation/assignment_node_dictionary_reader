const fs = require('fs');
const colorize = require('./colors.js');
const search = require('./search.js');

let dictionaryName;

function getSummary(fileName) {
  dictionaryName = fileName;
  process.stdin.resume();

  fs.readFile('./data/' + fileName, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    console.log('\n======================================');
    console.log(`${colorize.green('Successfully loaded')}: ${fileName}`);


    // convert JSON string to JS object
    const words = Object.keys(JSON.parse(data));
    console.log(`Word Count: ${words.length}`);

    // return object with number of occurences of each first letter of dictionary word
    const occurence = getFirstLetterOccurence(words);

    // loop through the object and log out occurence of each letter
    for (let letter in occurence) {
      console.log(`${letter}: ${occurence[letter]}`);
    }

    console.log(`\n${colorize.green('What kind of search?')}`);
    console.log('1: Exact match');
    console.log('2: Partial match');
    console.log('3: "Begins with" match');
    console.log('4: "Ending with" match\n');
    process.stdin.on('data', dictionaryListener);
  });
}

function dictionaryListener(input) {
  input = input.trim();
  process.stdin.removeListener('data', dictionaryListener);

  if (input === 'q') {
    console.log('Goodbye.');
    process.exit();
  }

  switch (input) {
    // 1: search for exact match
    case '1':
      console.log('Enter the search term:');

      process.stdin.on('data', (input) => {
        input = input.trim();

        search.exactMatch(dictionaryName, input);
      });
      break;
    // 2: search for partial match
    case '2':
      console.log('Enter the search term:');

      process.stdin.on('data', (input) => {
        input = input.trim();

        search.partialMatch(dictionaryName, input);
      });
      break;
    // 3. search for 'begins with' match
    case '3':
      console.log('Enter the search term:');

      process.stdin.on('data', (input) => {
        input = input.trim();

        search.beginsWith(dictionaryName, input);
      });
      break;
    // 4. search for 'ends with' match
    case '4':
      console.log('Enter the search term:');

      process.stdin.on('data', (input) => {
        input = input.trim();

        search.endsWith(dictionaryName, input);
      });
      break;
    default:
      console.log('Enter a valid search type!');
      break;
  }
}

function getFirstLetterOccurence(wordsArr) {
  const firstLetterOccurence = wordsArr.reduce((acc, word) => {
    const letter = word[0].toLowerCase();

    if (acc[letter]) {
      acc[letter] += 1;
    } else {
      acc[letter] = 1;
    }

    return acc;
  }, {});

  return firstLetterOccurence;
}


module.exports = getSummary;
