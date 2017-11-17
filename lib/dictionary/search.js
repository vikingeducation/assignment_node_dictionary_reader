var load = require('./load');
var currentDictionaryJSON = load.load.readDictionary('./data/' + load.dictFileArray[0]).toString();
var currentDictionary = JSON.parse(currentDictionaryJSON);
var currentDictionaryKeys = Object.keys(currentDictionary).join(', ');

var performRegex = (dictionary, regexString) => {
  var regex = new RegExp(regexString, 'g');
  var matches = [];
  var match = regex.exec(dictionary);
  while (match) {
      matches.push(match);
      match = regex.exec(dictionary);
  }
  var finalArray = [];
  for(i = 0; i <= (matches.length - 1); i++) {
    finalArray.push(matches[i][0].substring(1));
  }
  return finalArray;
};

/*
var getDefinitions = (results, dictionary) => {
  results.forEach((result) => {
    dictionary.forEach((key) => {
        if(result === dictionary[key]) {

        }
    });
  });
};
*/

var search = (dictionary, type, term) => {
  switch(type) {
    // exact
    case 1:
      var regexString = '(^|\\W)' + term.trim() + '(?=$|\\W)';
      return performRegex(dictionary, regexString);
      break;

    // partial
    case 2:
      var regexString = ' (\\W|\\w*)' + term.trim() + '(?:>,|\\w*|$)';
      return performRegex(dictionary, regexString);
      break;

    // begins with
    case 3:
      var regexString = '(^|\\W)' + term.trim() + '\\w*';
      return performRegex(dictionary, regexString);
      break;

    // ends with
    case 4:
      var regexString = '(^| )(\\W|\\w*)' + term.trim() + '(?=,)';
      return performRegex(dictionary, regexString);
      break;

    default:
      console.log("You've entered an invalid selection. Please make another selection and try again.")
      // call the function again
  }
};

module.exports = {
  search
}
