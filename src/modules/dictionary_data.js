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
  //var reg = new RegExp("(" + searchData + ")", "i");
  var reg = /(food)/i;
  console.log(reg);
  var keys = Object.keys(thisdictionary);
  var matches = [];
  keys = keys.join(' ')
  var match = reg.exec(keys);
  while (match) {
    matches.push(match);
  }
  return matches;
}


module.exports = {"letterFrequency": letterFrequency,"SetData": SetData,"thisdictionary": thisdictionary, "searchExact": searchExact, "searchPartial": searchPartial}
