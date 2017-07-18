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
      matches = {};
      for (let word in dictionary) {
        if (word.indexOf(data) !== -1) {
          matches[word] = dictionary[word];
        }
      }
      callback(dictionary, data, matches);
    });
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
