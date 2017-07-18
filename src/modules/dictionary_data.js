//var splitDict = {aWords = [awords]}
var thisdictionary;
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
    console.log(matches);
    return matches;
}

var searchFirst = function(){
  var matches = [];
  var keys = Object.keys(thisdictionary);
  for (var k in keys) {
    //console.log(k);
        if(keys[k].toString().includes(searchData) === true){

        matches.push(keys[k]);}
    }
    console.log(matches);
    return matches;
 }

var searchlast = function(lastchar){
  var matches = [];
  var keys = Object.keys(thisdictionary);
  for (var k in keys) {
    //console.log(k);
        if(keys[k][0] === lastchar){

        matches.push(keys[k]);}
    }
    console.log(matches);
    return matches;
}


module.exports = {"letterFrequency": letterFrequency,"SetData": SetData,"thisdictionary": thisdictionary,
"searchExact": searchExact, "searchPartial": searchPartial,
"searchlast": searchlast
}
