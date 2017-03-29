const fs = require('fs');
const dict = {};

dict.displayStats = function(dictionary) {
  console.log("Succesfully loaded!")

  let words = Object.keys(dictionary)
  let wordLength = words.length;
  const letters = 'abcdefghijklmnopqrstuvwyz'.split('');
  let wordCount = {};

  letters.forEach(function(letter) {
    wordCount[letter] = 0;
  });

  words.forEach(function(word) {
    wordCount[word[0]] += 1;
  });

  console.log("Total word count: " + wordLength);
  console.log("Word frequency by starting letter: ")
  letters.forEach(function(letter) {
    console.log(`${letter.toUpperCase()}: ${wordCount[letter]}`)
  })
}


module.exports = dict;