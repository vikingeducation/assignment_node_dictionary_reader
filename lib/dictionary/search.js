var load = require('./load');
var currentDictionaryBuf = load.load.readDictionary('./data/' + load.dictFileArray[0]);
var currentDictionary = currentDictionaryBuf.toString();
var currentDictionaryParsed = JSON.parse(currentDictionary);
var currentDictionaryKeys = Object.keys(currentDictionaryParsed).join(', ');

var search = {
  exact: (term, dictionary) => {
    var regexstring = '(^|\\W)' + term.trim() + '(?=$|\\W)';
    var regex = new RegExp(regexstring, 'g');
    var matches = [];
    var match = regex.exec(dictionary);
    while (match) {
        matches.push(match);
        match = regex.exec(dictionary);
    }
    var finalArray = [];
    for(i = 0; i <= (matches.length - 1); i++) {
      finalArray.push(matches[i][0].substring(1));
    }
    return finalArray;
  },
  partial: (term, dictionary) => {
    var regexstring = ' (\\W|\\w*)' + term.trim() + '(?:>,|\\w*|$)';
    var regex = new RegExp(regexstring, 'g');
    var matches = [];
    var match = regex.exec(dictionary);
    while (match) {
        matches.push(match);
        match = regex.exec(dictionary);
    }
    var finalArray = [];
    for(i = 0; i <= (matches.length - 1); i++) {
      finalArray.push(matches[i][0].substring(1));
    }
    return finalArray;
  },
  beginsWith: (term, dictionary) => {
    var regexstring = '(^|\\W)' + term.trim() + '\\w*';
    var regex = new RegExp(regexstring, 'g');
    var matches = [];
    var match = regex.exec(dictionary);
    while (match) {
        matches.push(match);
        match = regex.exec(dictionary);
    }
    var finalArray = [];
    for(i = 0; i <= (matches.length - 1); i++) {
      finalArray.push(matches[i][0].substring(1));
    }
    return finalArray;
  },
  endsWith: (term, dictionary) => {
    var regexstring = '(^| )(\\W|\\w*)' + term.trim() + '(?=,)';
    var regex = new RegExp(regexstring, 'g');
    var matches = [];
    var match = regex.exec(dictionary);
    while (match) {
        matches.push(match);
        match = regex.exec(dictionary);
    }
    var finalArray = [];
    for(i = 0; i <= (matches.length - 1); i++) {
      finalArray.push(matches[i][0].substring(1));
    }
    return finalArray;
  }
};

var testMatches = search.exact('poor', currentDictionaryKeys);
console.log(testMatches);
var testMatches = search.partial('poor', currentDictionaryKeys);
console.log(testMatches);
var testMatches = search.beginsWith('poor', currentDictionaryKeys);
console.log(testMatches);
var testMatches = search.endsWith('poor', currentDictionaryKeys);
console.log(testMatches);

module.exports = {
  search
}
