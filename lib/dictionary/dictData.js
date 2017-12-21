var load = require('./load');

// var currentDictionaryBuf = load.load.readDictionary('./data/dictionaries/' + load.dictFileArray[0]);
// var currentDictionary = load.bufToStr(currentDictionaryBuf);

var countWordsByLetter = (dictionary) => {
  var totalWords = Object.keys(dictionary).length;
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
      letterCount: letterCount,
    };

    resultsArray.push(wordCount);
  }
  return resultsArray;
};



// test
// var thisWordCount = countWordsByLetter(currentDictionaryJSON);
// console.log(thisWordCount);


module.exports = {
  countWordsByLetter
};
