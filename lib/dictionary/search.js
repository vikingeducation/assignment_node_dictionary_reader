var load = require('./load');
var currentDictionaryBuf = load.load.readDictionary('./data/' + load.dictFileArray[0]);
var currentDictionary = currentDictionaryBuf.toString();
var currentDictionaryParsed = JSON.parse(currentDictionary);
var currentDictionaryKeys = Object.keys(currentDictionaryParsed).join(', ');

// thisRegex = /aba\w+/g;
// var matches2 = [];
// var match2 = thisRegex.exec(currentDictionaryKeys);
// while(match2) {
//   matches2.push(match2);
//   match2 = thisRegex.exec(currentDictionaryKeys);
// }
// console.log(matches2);

var search = {
  exact: (term, dictionary) => {
    var regex = new RegExp(term, 'g');
    var matches = [];
    var match = regex.exec(dictionary);
    while (match) {
        matches.push(match);
        match = regex.exec(dictionary);
    }
    return matches;
  },
  partial: (term, dictionary) => {

  },
  beginsWith: (term, dictionary) => {
    var variable = term.trim();
    var regexstring = '(^|\\W)' + variable + '\\w*';
    var regex = new RegExp(regexstring, 'g');
    var matches = [];
    var match = regex.exec(dictionary);
    while (match) {
        matches.push(match);
        match = regex.exec(dictionary);
    }
    var singleWordMatch;
    var finalArray = [];
    for(i = 0; i <= (matches.length - 1); i++) {
      singleWordMatch = matches[i][0];
      finalArray.push(singleWordMatch);
    }
    return finalArray;
  },
  endsWith: (term, dictionary) => {

  }
};

var testMatches = search.beginsWith('poo', currentDictionaryKeys);
console.log(testMatches);

module.exports = {
  search
}
