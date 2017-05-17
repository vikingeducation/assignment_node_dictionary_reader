const fs = require('fs');
const dirPath = './data';

const _isJSON = (file) => {
  let JSONregex = /(.)+\.json/;
  return JSONregex.test(file);
};

let _dictionaries = [];

const listDictionaries = () => {
  fs.readdir(dirPath, (err, data) => {
    if (err) throw err;

    // iterates through results and checks if each element is a JSON file
    data.forEach((file, i) => {
      if(_isJSON(file)){

        // saves result to a dictionary array to access later
        _dictionaries.push(file);
        // display non zero-indexed directory contents
        console.log(`${ i + 1 }. ${ file }`);
      }
    });
  });
};

const isDictionary = (input) => {
  // converts user input to zero index format
  input -= 1;

  return _dictionaries[input];
};

const _getWordCount = (dictionary) => {
  let wordcount = 0;
  for (let key in dictionary) {
    wordcount++;
  }

  return wordcount;
};

const _getWordFrequency = (dictionary) => {
  let alphabet = "abcdefghijklmnopqrstuvwxyz".split('');
  let wordFrequency = {};

  // initializes wordFrequency object with zero for each letter property
  alphabet.forEach((letter) => {
    wordFrequency[letter] = 0;
  });

  for (let word in dictionary) {
    alphabet.forEach((letter) => {
      if (word.startsWith(letter)) {
        wordFrequency[letter] += 1;
      }
    });
  }
  return wordFrequency;
};

const openDictionary = (input) => {
  let path = `../../data/${ _dictionaries[input - 1]}`;
  let dictionary = require(path);

  let wordCount = _getWordCount(dictionary);
  let wordFrequency = _getWordFrequency(dictionary);

  console.log(`Word count: ${ wordCount }\n`);
  console.log('Word frequency by starting letter:');

  for (var letter in wordFrequency) {
    console.log(`${ letter }: ${ wordFrequency[letter] }`);
  }

  return dictionary;
};

module.exports = {
  listDictionaries: listDictionaries,
  isDictionary: isDictionary,
  openDictionary: openDictionary
};