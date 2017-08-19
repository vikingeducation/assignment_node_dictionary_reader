var fs = require('fs');
var search = require('./searching');


var iterateAlphabetStartingLetters = function (data) {
  console.log("Word frequency by starting letter:");
  var str = "abcdefghijklmnopqrstuvwxyz";
  position = 0;
  for(var i=0; i<str.length; i++) {
    var nextChar = str.charAt(i);
    var countOfLetters = 0;
    while ( ((data[position].charAt(1)) === nextChar) && (position + 1 < data.length)) {
      countOfLetters++;
      position++;
    }

    console.log (`${nextChar} : ${countOfLetters}`);

   }
  }

var dictionaryData = function (strToDictionary) {
  var path = `./data/${strToDictionary}`;

  var numWords = 0;
  fs.readFile(path, 'utf8', (err, data) => {
    if (err){
      throw err;
    }
    else{
      console.log(`Successfully loaded: ${strToDictionary}`);
      var regex =/"\w+":/g;
      console.log( `Word count: ${(data.match(regex)).length}` );
      iterateAlphabetStartingLetters (data.match(regex));
      search(strToDictionary, (data.match(regex)).toString(), data);
    }

  });

}

module.exports = dictionaryData;
