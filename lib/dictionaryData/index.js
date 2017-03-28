const ui = require("../ui");
const fs = require("fs");

var fileStats = {
  wordCount: 0
};
var alphabet = ["a", "b", "c", "d", "e"];

alphabet.forEach(function(val) {
  fileStats[val] = 0;
});

function collectStats(filePath) {
  var data = fs.readFileSync(path, (err, data) => data);
  fileStats.wordCount = countWords(data);
  countLetter(data);
}

function countWords(data) {
  return Object.keys(data).length;
}

function countLetter(data) {
  alphabet.forEach();
}

module.exports;
