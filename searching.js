var Search = {

  //Exact match
  exactMatch: function(str, arr){
    let matchArray = [];
    for (var i = 0; i < arr.length; i++){
      if (arr[i] === str){
        matchArray.push(arr[i]);
      }
    }
    return matchArray;
  },

  partialMatch: function(str, arr){
    let matchArray = [];
    for (var i = 0; i < arr.length; i++){
      if(arr[i].match(new RegExp(str, 'i'))) {
        matchArray.push(arr[i]);
      }
    }
    return matchArray;
  },

  beginsWith: function(str, arr){
    let matchArray = [];
    for(var i = 0; i < arr.length; i++){
      if(arr[i].match(new RegExp('^'+str, 'i'))){
        matchArray.push(arr[i]);
      }
    }
    return matchArray;
  },

  endsWith: function(str, arr){
    let matchArray = [];
    for(var i =0; i < arr.length; i++){
      if(arr[i].match(new RegExp(str+'$', 'i'))){
        matchArray.push(arr[i]);
      }
    }
    return matchArray;
  }
};

//Testing.....
// var str = "r";
// var test = ['fuz', 'fuze','fuzee','fuzhou','fuzz','fuzzily', 'apple', 'bad', 'far', 'ruff'];
//
// var _search = new Search();
// //tested exact search
// console.log("Exact match: ", _search.exactMatch(str, test));
//
// //partialMatch
// console.log("partialMatch: ",_search.partialMatch(str, test));
//
// //beginsWith
// console.log("beginsWith: ",_search.beginsWith(str, test));
//
// //endsWith
// console.log("endsWith: ", _search.endsWith(str, test));

module.exports = Search;
