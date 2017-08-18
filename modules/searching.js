var fs = require('fs');
var choices = 4;
var wordDataG = "";
var wholeDataG = "";
var dictionaryToSearchG = "";
var selected = 0;

var searching = function (dictionaryToSearch, wordData, wholeData) {
  dictionaryToSearchG = dictionaryToSearch;
  wordDataG = wordData;
  wholeDataG = wholeData;
  getSeleciton();
}

var getSeleciton = function() {
  console.log("What kind of search?\n1: Exact\n2: Partial\n3: Begins With\n4: Ends With");
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', selection);
}

var selection = function (data) {
  data = data.trim();

  if ( (Number(data) > 0) &&  (Number(data) <= choices) ) {
    process.stdin.pause();
    process.stdin.removeListener('data', selection);
    selected=Number(data);
    searchFor();
  }
  else {
    console.log(`Please make a selection between 1 and ${choices}`);
  }
}

var searchFor = function () {
  console.log("Enter the search term:");
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', searchBy);
}

var searchBy = function (wordToSearchFor) {
  wordToSearchFor = wordToSearchFor.trim();
  //Entire word
  if (selected === 1) {
    var regex = new RegExp ("\\b(" + wordToSearchFor + ")\\b", 'g');
  }
  //Partial of word
  else if (selected === 2) {
    var regex = new RegExp ("\\w*(" + wordToSearchFor + ")\\w*", 'g');
  }
  //Beginning of word
  else if (selected === 3) {
    var regex = new RegExp ("\\b(" + wordToSearchFor + ")\\w*", 'g');
  }
  //Ending of word
  else if (selected === 4) {
    var regex = new RegExp ("\\w*(" + wordToSearchFor + ")\\b", 'g');
  }
  var match = wordDataG.match(regex);
  if (match === null) {
    console.log('Sorry, selction was invalid, try again');
    process.stdin.pause();
    process.stdin.removeListener('data', searchBy);
    getSeleciton();
  }
  else {
    console.log(`Found ${match.length} matches:`);
    for (var i = 0; i < match.length; i++ ) {
      console.log(match[i]);
    }
    process.stdin.pause();
    process.stdin.removeListener('data', searchBy);
  }
}

module.exports = searching;
