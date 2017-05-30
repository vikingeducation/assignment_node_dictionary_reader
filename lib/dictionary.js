function Dictionary(dictionaryName, dictionaryContents) {
  if (!(this instanceof Dictionary)) {
    return new Dictionary(dictionary);
  }

  this.dictionaryName = dictionaryName;
  if (dictionaryContents) {
    this.dictionaryContents = JSON.parse(dictionaryContents);
  } else {
    this.dictionaryContents = {};
  }
}

Dictionary.prototype.getDictionaryContents = function getDictioanryContents() {
  return this.dictionaryContents;
}

Dictionary.prototype.getDictionaryName = function getDictionaryName() {
  return this.dictionaryName;
}

Dictionary.prototype.addWordToDictionary = function addWordToDictionary(word, definition) {
  this.dictionaryContents[word] = definition;
}

Dictionary.prototype.printStatistics = function printStatistics() {
  console.log(`Successfully loaded: ${this.dictionaryName}`);
  console.log(`Word count: ${Object.keys(this.dictionaryContents).length}`);
  this.printDictionaryHistogram();
}

Dictionary.prototype.printDictionaryHistogram = function printDictionaryHistogram() {
  //initialize histogram
  var dictionaryHistogram = {};
  var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  alphabet.forEach( (value) => {
    dictionaryHistogram[value] = 0;
  });

  for (word in this.dictionaryContents) {
    var firstLetter = word[0];
    dictionaryHistogram[firstLetter] += 1;
  }

  console.log("Word frequency by starting letter:");
  for (letter in dictionaryHistogram) {
    console.log(`${letter.toUpperCase()}: ${dictionaryHistogram[letter]}`);
  }
}

module.exports = Dictionary;
