const ui = require("../ui");
//const dictionaryData = require('../dictionaryData');

// Search functions...

//Exact searching
function exactSearch(term, data) {
  console.log(data[term]);
}

//Partial
function partialSearch(term, data) {
  //console.log(Object.keys(data));
  var regex = new RegExp("/\\\B" + term + "|" + term + "\\B/");

  Object.keys(data).forEach(function(word) {
    if (regex.test(word)) {
      console.log(word);
    }
  });
}

//Begins with
function beginsWithSearch(term, data) {}

//Ends with
function endsWithSearch(term, data) {}

module.exports = { exactSearch, partialSearch };
