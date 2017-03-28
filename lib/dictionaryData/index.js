const ui = require('../ui');
const fs = require('fs');

var fileStats = {
  wordCount: 0
};

var alphabet = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

alphabet.forEach(function(val) {
  fileStats[val] = 0;
});

function collectStats(path) {
  var data = fs.readFileSync(path, 'utf-8');
  data = JSON.parse(data);
  fileStats.wordCount = countWords(data);
  countLetter(data);
  return fileStats;
}

function countWords(data) {
  return Object.keys(data).length;
}

function countLetter(data) {
  Object.keys(data).forEach(function(val) {
    for (var i = 0; i < alphabet.length; i++) {
      if (val[0] === alphabet[i]) {
        fileStats[alphabet[i]]++;
        break;
      }
    }
  });
}

module.exports = { collectStats };
