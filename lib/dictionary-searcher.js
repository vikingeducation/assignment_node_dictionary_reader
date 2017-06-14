var Dictionary = require('./dictionary');

function Searcher(dictionary) {
  if (!(this instanceof Searcher )) {
    return new Searcher(dictionary)
  }

  this.dictionary = dictionary;
}

Searcher.prototype.searchForString = function searchForString(string) {
  //search through current dictionary using regex of string, and return a new dictionary with any matches

  var resultsDictionary = new Dictionary(this.dictionary.getDictionaryName(), undefined);
  var searchRegex = new RegExp(string);
  console.log(searchRegex);
  for (word in this.dictionary.dictionaryContents) {
    if (searchRegex.exec(word)) {
      console.log(`${word}: ${this.dictionary.dictionaryContents[word]}`);
    }
  }

  // console.log(`Name: ${resultsDictionary.dictionaryName}, Contains: ${resultsDictionary.dictionaryContents}`);
}


module.exports = Searcher;
