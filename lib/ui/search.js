const load = require('../loader');
const selectDict = require('./selectDict');
const search = require('../search');
const menu = require('./menu');
const prompt = require('./prompt');
const fs = require('fs');

// Recieve results from a load
function recieveDict(err, path, result) {
  if (err) {
    // Prompt user again on error
    console.log('Sorry, there was an error. Please try again.');
    selectDict(loadDict);
  } else {
    displayMenu(result);
  }
}

function performSearch(dictionary, callback) {
  console.log('Enter search term: ');
  callback(dictionary, displayResult);
}

function displayResult(dictionary, term, words) {
  if (!words || !Object.keys(words).length) {
    console.log(`Sorry, I couldn't find ${term}`);
    displayMenu(dictionary);
  } else {
    console.log('Results:');
    for (let word in words) {
      console.log(`${word}: ${words[word]}`);
    }
    saveMenu(dictionary, words);
  }
}

function saveMenu(dictionary, words) {
  menu('Do you want to save results', { y: '', n: '' }, choice => {
    if (choice === 'y') {
      prompt('What filepath should we write results to?', filename => {
        fs.readdir('./saves', (err, data) => {
          if (err) {
            console.log(`Warning: ${err}`);
            displayMenu(dictionary, words);
          } else {
            if (data.includes(filename)) {
              menu('File exist. Overwrite?', { y: '', n: '' }, choice => {
                if (choice === 'y') {
                  writeFile(filename, dictionary, words);
                } else {
                  displayMenu(dictionary);
                }
              });
            } else {
              writeFile(filename, dictionary, words);
            }
          }
        });
      });
    } else {
      displayMenu(dictionary);
    }
  });
}

function writeFile(filename, dictionary, words) {
  fs.writeFile(`./saves/${filename}`, JSON.stringify(words), err => {
    if (err) {
      console.log(`Warning: ${err}`);
    } else {
      console.log('File successfully written.');
    }

    displayMenu(dictionary);
  });
}

function loadDict(path) {
  load(path, recieveDict);
}

function displayMenu(dictionary) {
  menu(
    'Search Menu',
    {
      f: 'Full Text Search',
      p: 'Partial Matches',
      b: 'Word Begins With..',
      e: 'Word Ends With...',
      a: 'Find anagrams',
      q: 'Quit'
    },
    result => {
      switch (result) {
        case 'f':
          performSearch(dictionary, search.fullText);
          break;
        case 'p':
          performSearch(dictionary, search.partText);
          break;
        case 'b':
          performSearch(dictionary, search.startSearch);
          break;
        case 'a':
          performSearch(dictionary, search.searchAnagram);
          break;
        case 'e':
          performSearch(dictionary, search.endSearch);
          break;
        case 'q':
          process.exit();
      }
    }
  );
}

module.exports = loadDict;
