var load = require('./load');

var currentDictionaryBuf = load.load.readDictionary('./data/' + load.dictFileArray[0]);
var currentDictionary = load.bufToStr(currentDictionaryBuf);
var currentDictionaryJSON = JSON.parse(currentDictionary);
var totalWords = Object.keys(currentDictionaryJSON).length;

var countWordsByLetter = (dictionary) => {
  var letters = "abcdefghijklmnopqrstuvwxyz".split('');
  var resultsArray = [];
  var currentLetter;
  for(var i = 0; i <= (letters.length - 1); i++) {
    currentLetter = letters[i];
    var letterCount = 0;
    Object.keys(dictionary).forEach((key) => {
      if(key[0] === currentLetter) {
        letterCount++;
      }
    });

    var wordCount = {
      currentLetter: currentLetter,
      letterCount: letterCount
    };

    resultsArray.push(wordCount);
  }
  return resultsArray;
};



// test
// var thisWordCount = countWordsByLetter(currentDictionaryJSON);
// console.log(thisWordCount);


module.exports = {
  countWordsByLetter,
  totalWords
};
