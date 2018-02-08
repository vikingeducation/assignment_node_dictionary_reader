var dictionaryData = {

  // textPath: './data/dictionary.json',

  dictWords: function(data) {
    var words = Object.keys(data)
    return words
  },

  displayWordCount: function(data){
    var wordCount = Object.keys(data).length
    console.log(`Word Count: ${wordCount}`);
  },

  displayWordCountByLetter: function(data){
    var words = Object.keys(data)
    var letters = {}
    words.forEach(function(word) {
      if(letters[word.charAt(0)] === undefined) {
        letters[word.charAt(0)] = 1
      } else {
        letters[word.charAt(0)] += 1
      }
    });
    console.log('Word Count by Letter:');
    console.log(letters);
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
