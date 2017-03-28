const ui = require("../ui");
const fs = require("fs");

var fileStats = {
  wordCount: 0
};

var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

alphabet.forEach(function(val) {
  fileStats[val] = 0;
});

function collectStats(path) {
  var data = fs.readFileSync(path);
  fileStats.wordCount = countWords(data);
  countLetter(data);
}

function countWords(data) {
  return Object.keys(data).length;
}

function countLetter(data) {

  Object.keys(data).forEach(function(index,val) {
    for (var i = 0; i < alphabet.length; i++) {
      console.log(val + " " + alphabet[i]);
      if (val[0] === alphabet[i]) {
        //console.log('hit');
        fileStats[alphabet[i]]++;
      }
    }
  });

  console.log (fileStats);
}

collectStats('../../data/dictionary.json');
//module.exports;
