let searches = {
  // Full Text Search
  f: function(dictionary, searchText, matches, callback) {
    if (dictionary[searchText]) {
      matches[searchText] = dictionary[searchText];
    }
    callback(dictionary, searchText, matches);
  },
  // Partial Match
  p: function(dictionary, searchText, matches, callback) {
    for (let word in dictionary) {
      if (word.indexOf(searchText) !== -1) {
        matches[word] = dictionary[word];
      }
    }
    callback(dictionary, searchText, matches);
  },
  // Word Begins With
  b: function(dictionary, searchText, matches, callback) {
    for (let word in dictionary) {
      if (word.startsWith(searchText)) {
        matches[word] = dictionary[word];
      }
    }
    callback(dictionary, searchText, matches);
  },
  // Word Ends With
  e: function(dictionary, searchText, matches, callback) {
    for (let word in dictionary) {
      if (word.endsWith(searchText)) {
        matches[word] = dictionary[word];
      }
    }
    callback(dictionary, searchText, matches);
  },
  // Anagrams
  a: function(dictionary, searchText, matches, callback) {
    let searchSorted = searchText.split('').sort().join('');
    for (let word in dictionary) {
      let wordSorted = word.split('').sort().join('');
      if (wordSorted === searchSorted) {
        matches[word] = dictionary[word];
      }
    }
    callback(dictionary, searchText, matches);
  }
};

module.exports = searches;
