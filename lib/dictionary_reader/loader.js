const fs = require('fs');
const colorizer = require('./colorizer');

const path = './data/';
const dictionaries = [];

function _checkJSON(file) {
  const regex = /(.)+\.json/;
  return regex.test(file);
}

function listDicts() {
  fs.readdir(path, (err, files) => {
    if (err) throw err;
    files.forEach((file, index) => {
      if (_checkJSON(file)) {
        dictionaries.push(file);
        const dictIndex = colorizer.colorize(`${index + 1}`, 'red');
        console.log(`${dictIndex}. ${file}`);
      }
    });
  });
}

function checkChoice(choice) {
  const index = choice - 1;
  return dictionaries[index];
}

function _getWordCount(dict) {
  const wordCount = colorizer.colorize(Object.keys(dict).length, 'red');
  return wordCount;
}

function _getWordFrequency(dict) {
  const frequency = {};
  let words;
  let letterCount;
  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
  letters.forEach((letter) => {
    words = Object.keys(dict).filter(word => word[0] === letter);
    letter = letter.toUpperCase();
    letterCount = colorizer.colorize(words.length, 'red');
    frequency[letter] = letterCount;
    // console.log(`${letter}: ${letterCount}`);
  });
  return frequency;
}

function displayStats(filename, wordCount, wordFrequency) {
  console.log(`\nSuccessfully loaded: ${filename}`)
  console.log(`Word count: ${wordCount}`);
  console.log('Word frequency by starting letter:');
  for (const letter in wordFrequency) {
    console.log(`${letter}: ${wordFrequency[letter]}`);
  }
}

function loadDict(choice) {
  const filename = dictionaries[choice - 1];
  const dictPath = `${path}${filename}`;

  const data = fs.readFileSync(dictPath, 'utf8');
  const dictionary = JSON.parse(data);

  const wordCount = _getWordCount(dictionary);
  const wordFrequency = _getWordFrequency(dictionary);
  displayStats(filename, wordCount, wordFrequency);

  return dictionary;
}

module.exports = {
  listDicts,
  checkChoice,
  loadDict
};

// function Loader(path, callback) {
//   fs.readdir(path, (err, files) => {
//     if (err) {
//       return callback(err);
//     }
//     callback(null, files);
//   });
// }
//
// module.exports = Loader;
