const ui = require('../ui');
//const dictionaryData = require('../dictionaryData');

// Search functions...

//Exact searching
function exactSearch(term, data) {
  console.log(data.data[term]);
}

//Partial
function partialSearch(term, data) {}

//Begins with
function beginsWithSearch(term, data) {}

//Ends with
function endsWithSearch(term, data) {}

module.exports = { exactSearch };
