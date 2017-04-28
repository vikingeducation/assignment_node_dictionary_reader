let _dict;
let _words = [];
let _letterCount = {}


function initDict() {
  let count = 0;
  for (x in _dict) {
    _words.push([x, _dict[x]]);
    letter = x.toString().toUpperCase()[0];
    _letterCount[letter] === undefined ? _letterCount[letter] = 0 : _letterCount[letter] += 1;
    }
}

module.exports = function(dict) {
  _dict = dict;
  let dictionary = {};
  initDict();

  dictionary.words = dict;

  dictionary.count = (function() {
    return _words.length;
  })();

  dictionary.letterStats = (function() {
    return _letterCount;
  })();

  dictionary.printStats = function() {
    console.log(`\nWord Count: ${dictionary.count}`);
    console.log('Word frequency by starting letter: ');
    for (letter in _letterCount) {
      console.log(`${letter}: ${_letterCount[letter]}`);
    }
    console.log(`\n`);
  }

  return dictionary;
};
