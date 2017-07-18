const dict = require('./dictionary_data.js');

var whatSearch = function() {
  console.log("What type of search would you like to perform? Options are: Exact, Partial, Begins with, Ends with");
}

var searchType = 0;

var searchType = function(data){
  data = data.trim();
  switch(data[0].toUpperCase()) {
    case "E":
      searchType = 0;
    break;
    case "P":
      searchType = 1;
    break;
    case "B":
      searchType = 2;
    break;
    case "E":
      searchType = 3;
    break;
    default: return false;
  }
  console.log("what would you like to search?");
  return true;
}
var searchNow = function(searchData){
  searchData = searchData.trim();
  switch(searchType) {
    case 0:
      console.log(dict.searchExact(searchData));
    break;
    case 1:
      console.log(dict.searchPartial(searchData));
    break;
    case 2:

    break;
    case 3:

    break;

  }
  console.log("what would you like to search?");
  return true;
}


module.exports = { "searchType": searchType,  "searchNow": searchNow, "whatSearch": whatSearch}
