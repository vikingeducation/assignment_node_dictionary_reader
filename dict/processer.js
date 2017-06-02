function processInput(jsonObj) {
  var length = Object.keys(jsonObj).length
  var wordsHash = getWordsHash(jsonObj);
  return Object.assign(wordsHash, {
    words: length
  });
}

function getWordsHash(dictObj) {
  var letterHash = {};
  for (var key of Object.keys(dictObj)) {
    if (letterHash[key.charAt(0)]) {
      letterHash[key.charAt(0)] += 1
    } else {
      letterHash[key.charAt(0)] = 1
    }
  }
  return letterHash;
}

module.exports =  {
  processInput: processInput
}