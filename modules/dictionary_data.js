var dictionaryData = {

  // textPath: './data/dictionary.json',

  dictWords: function(data) {
    var dictionaryWords = Object.keys(data)
    return dictionaryWords
  },

  findSimilar: function(userInput, data) {
    var words = this.dictWords(data);
    var matches = words.filter(function(word){ return word.includes(userInput)});
    return matches
  },

  displaySimilar: function(userInput, data) {
    console.log(`\nSorry, we don't know "${userInput}."`)

    var suggestions = this.findSimilar(userInput, data);

    if (suggestions.length > 0) {
      console.log('Here are some suggestions:');
      suggestions.forEach(function(word) {
        console.log(word);
      });
      console.log("Please enter one of the words above, or 'q' to quit")
    } else {
      console.log("Please enter another word or 'q' to quit.")
    }
  },

  displayDefinition: function(userInput, data) {
    console.log(`\nThe definition of "${userInput}":`);
    console.log(data[userInput]);
  }

}; // dictionaryData

module.exports = dictionaryData;
