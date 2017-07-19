const prompt = require('./ui/prompt');

searches = {
  fullText: function(dictionary, callback) {
    prompt(null, data => {
      let matches = {};
      if (dictionary[data]) {
        matches[data] = dictionary[data];
      }
      callback(dictionary, data, matches);
    });
  },

  partText: function(dictionary, callback) {
    prompt(null, data => {
      let matches = {};
      for (let word in dictionary) {
        if (word.indexOf(data) !== -1) {
          matches[word] = dictionary[word];
        }
      }
      callback(dictionary, data, matches);
    });
  },

  startSearch: function(dictionary, callback) {
    prompt(null, data => {
      let matches = {};
      for (let word in dictionary) {
        if (word.startsWith(data)) {
          matches[word] = dictionary[word];
        }
      }
      callback(dictionary, data, matches);
    });
  },

  endSearch: function(dictionary, callback) {
    prompt(null, data => {
      let matches = {};
      for (let word in dictionary) {
        if (word.endsWith(data)) {
          matches[word] = dictionary[word];
        }
      }
      callback(dictionary, data, matches);
    });
  },

  searchAnagram: function(dictionary, callback) {
    prompt(null, data => {
      let matches = {};
      data = data.split('').sort().join('');
      for (let word in dictionary) {
        let wordSorted = word.split('').sort().join('');
        if (wordSorted === data) {
          matches[word] = dictionary[word];
        }
      }
      callback(dictionary, data, matches);
    });
  }
};

module.exports = searches;
