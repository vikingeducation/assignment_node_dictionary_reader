const dict = require('./dictionary_data');

var whatSearch = function() {
  console.log("What type of search would you like to perform? Options are: Exact, Partial, Begins with, Ends with");
}

var searchType = 0;

var searchType = function(data){
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
  return true;
}
