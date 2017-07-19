searches = {
  fullText: function(dictionary, callback) {
    acceptInput(data => {
      let matches = {};
      if (dictionary[data]) {
        matches[data] = dictionary[data];
      }
      callback(dictionary, data, matches);
    });
  },

  partText: function(dictionary, callback) {
    acceptInput(data => {
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
    acceptInput(data => {
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
    acceptInput(data => {
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
    acceptInput(data => {
      let matches = {};
      data = data.split("").sort().join("");
      for(let word in dictionary) {
        let wordSorted = word.split("").sort().join("");
        if(wordSorted === data) {
          matches[word] = dictionary[word];
        }
      }
      callback(dictionary, data, matches);
    })
  }
};

function acceptInput(callback) {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  function onData(data) {
    process.stdin.pause();
    process.stdin.removeListener('data', onData);
    data = data.trim();

    callback(data);
  }

  process.stdin.on('data', onData);
}

module.exports = searches;
