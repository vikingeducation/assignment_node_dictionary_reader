//var splitDict = {aWords = [awords]}
const saving = require('./saving.js');
var thisdictionary;
var lastSearch;
var SetData = function(setDict)
{
thisdictionary = setDict;
}
var letterFrequency = function(dict) {
  var letterFrequencyObj = {
  }
var dictword = Object.keys(dict);
  for(i=0; i<dictword.length; i++) {
    var word = dictword[i];
    var firstLetter = word[0];

    if (letterFrequencyObj[firstLetter] === undefined) {
      letterFrequencyObj[firstLetter] = 1;
    }
    else {
        letterFrequencyObj[firstLetter] += 1;
      }
    }
DisplayWordCount(letterFrequencyObj);
    return letterFrequencyObj;
}

var DisplayWordCount = function(wordCount){
  for (var k in wordCount) {
      if (wordCount.hasOwnProperty(k)) {
        console.log(wordCount[k] + " words with " + k );
      }
  }
}
var searchExact = function(searchWord){
  lastSearch = thisdictionary[searchWord];
  saving.LastSearch(lastSearch);

  return thisdictionary[searchWord];
}

var searchPartial = function(searchData){

  var matches = [];
  var keys = Object.keys(thisdictionary);
  for (var k in keys) {
    //console.log(k);
        if(keys[k].toString().includes(searchData) === true){

        matches.push(keys[k]);}
    }


    lastSearch = matches;
    saving.LastSearch(lastSearch);
    return matches;
}


var searchFirst = function(firstchar){
 var matches = [];
 var keys = Object.keys(thisdictionary);
 var indexC = firstchar.length;
 for (var k in keys) {
   if((keys[k].length >= firstchar.length) && (keys[k].substring(0,indexC) === firstchar)) {
   matches.push(keys[k]);}
   }

   lastSearch = matches;
   saving.LastSearch(lastSearch);
 return matches;
}

var searchLast = function(lastchar){
  var matches = [];
  var keys = Object.keys(thisdictionary);
  for (var k in keys) {
    if((keys[k].length >= lastchar.length) && (keys[k].slice(-lastchar.length) === lastchar)) {
    matches.push(keys[k]);}
    }

    lastSearch = matches;
    saving.LastSearch(lastSearch);
  return matches;
}
var SaveSearch = function()
{
saving.SaveSearch();
}

module.exports = {"letterFrequency": letterFrequency,"SetData": SetData,"thisdictionary": thisdictionary,
"searchExact": searchExact, "searchPartial": searchPartial,
"searchLast": searchLast, "searchFirst": searchFirst, "SaveSearch": SaveSearch
}
