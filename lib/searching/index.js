const ui = require('../ui');
//const dictionaryData = require('../dictionaryData');

function exactSearch(term, data) {
  return data[term];
}

function partialSearch(term, data) {
  var regex = new RegExp(term);
  return regexSearch(regex, data);
}

function beginsWithSearch(term, data) {
  var regex = new RegExp('\\b' + term);
  return regexSearch(regex, data);
}

//Ends with
function endsWithSearch(term, data) {
  var regex = new RegExp(term + '\\b');
  return regexSearch(regex, data);
}

function regexSearch(regex, data) {
  var wordMatches = [];
  Object.keys(data).forEach(function(word) {
    if (regex.test(word)) {
      wordMatches.push(word);
    }
  });
  return wordMatches;
}

module.exports = {
  exactSearch,
  partialSearch,
  beginsWithSearch,
  endsWithSearch
};
