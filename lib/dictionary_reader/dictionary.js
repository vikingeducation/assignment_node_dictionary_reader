var fs = require('fs');
var colorizer = require('./colorizer');

var filename;
var dict;

function Dictionary(path, callback) {
  filename = path.slice(7,path.end);
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    dict = JSON.parse(data);
    displayStats(dict);
    callback(dict);
  });
}

displayStats = function(dict) {
  console.log(`Successfully loaded: ${filename}`);
  var wordCount = colorizer.colorize(Object.keys(dict).length, 'red');
  console.log(`Word count: ${wordCount}`);
  console.log('Word frequency by starting letter:');
  var frequency = {};
  var words;
  const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  letters.forEach(letter => {
    words = Object.keys(dict).filter(word => word[0] === letter);
    letter = letter.toUpperCase();
    var letterCount = colorizer.colorize(words.length, 'red');
    frequency[letter] = letterCount;
    console.log(`${letter}: ${letterCount}`);
  });
};

module.exports = Dictionary;
