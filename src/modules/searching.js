const dict = require('./dictionary_data.js');

var whatSearch = function() {
  console.log("What type of search would you like to perform? Options are: 1: Exact, 2: Partial, 3: Begins with, 4: Ends with");
}

var searchType = 0;

var searchType = function(data){
  data = data.trim();
  switch(data[0].toUpperCase()) {
    case "1":
      searchType = 0;
    break;
    case "2":
      searchType = 1;
    break;
    case "3":
      searchType = 2;
    break;
    case "4":
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
      console.log(dict.searchExact(searchData)+ "\n\nDo you want to save this search?");
    break;
    case 1:
      console.log(dict.searchPartial(searchData) + "\n\nDo you want to save this search?");

      //console.log();
    break;
    case 2:
      console.log(dict.searchFirst(searchData)+ "\n\nDo you want to save this search?");
    break;
    case 3:
      console.log(dict.searchLast(searchData)+ "\n\nDo you want to save this search?");
    break;

  }

  return true;
}


module.exports = { "searchType": searchType,  "searchNow": searchNow, "whatSearch": whatSearch}
