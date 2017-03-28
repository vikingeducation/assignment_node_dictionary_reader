const ui = require('../ui');
//const dictionaryData = require('../dictionaryData');

function exactSearch(term, data) {
  console.log(data[term]);
}

function partialSearch(term, data) {
  var regex = new RegExp(term);
  var wordMatches = [];

  Object.keys(data).forEach(function(word) {
    if (regex.test(word)) {
      wordMatches.push(word);
    }
  });

  return wordMatches;
}

function beginsWithSearch(term, data) {
  var wordMatches = [];
  var regex = new RegExp('\\B' + term);
  Object.keys(data).forEach(function(word) {
    if (regex.test(word)) {
      wordMatches.push(word);
    }
  });
}

//Ends with
function endsWithSearch(term, data) {}

module.exports = {
  exactSearch,
  partialSearch,
  beginsWithSearch,
  endsWithSearch
};
