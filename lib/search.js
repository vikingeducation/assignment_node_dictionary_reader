function search(dictionary, userChoice, searchTerm) {
  var keys = Object.keys(dictionary);
  var searchType = {
    exact: (keys, searchTerm) => {
      console.log("I am executing");
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] === searchTerm) {
          console.log("Found a match");
          console.log(searchTerm);
        }
      }
    },
    partial: ,
    begins: 0,
    ends: 0
  };
  searchType[userChoice](keys, searchTerm);
}

module.exports = search;
