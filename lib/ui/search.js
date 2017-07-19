const selectDict = require('./selectDict');
const search = require('../search');
const menu = require('./menu');
const prompt = require('./prompt');
const writeFile = require('../io/saveDict');
const fs = require('fs');

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
        fs.readdir('./data', (err, data) => {
          if (err) {
            console.log(`Warning: ${err}`);
            displayMenu(dictionary, words);
          } else {
            if (data.includes(filename)) {
              menu('File exist. Overwrite?', { y: '', n: '' }, choice => {
                if (choice === 'y') {
                  writeFile(filename, dictionary, words, displayMenu);
                } else {
                  displayMenu(dictionary);
                }
              });
            } else {
              writeFile(filename, dictionary, words, displayMenu);
            }
          }
        });
      });
    } else {
      displayMenu(dictionary);
    }
  });
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
      l: 'Load another dictionary',
      q: 'Quit'
    },
    result => {
      switch (result) {
        case 'q':
          // The user want's out!
          process.exit();
        case 'l':
          // Load the load menu
          selectDict(recieveDict);
          break;
        default:
          // The user wants to search
          prompt('Enter search term:', searchText => {
            let matches = {};
            search[result](dictionary, searchText, matches, displayResult);
          });
      }
    }
  );
}

// Recieve results from a load
function recieveDict(err, path, result) {
  if (err) {
    // Prompt user again on error
    console.log('Sorry, there was an error. Please try again.');
    selectDict(recieveDict);
  } else {
    displayMenu(result);
  }
}

module.exports = recieveDict;
