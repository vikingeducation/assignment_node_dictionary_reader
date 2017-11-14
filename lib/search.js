function search(dictionary, userChoice, searchTerm) {
  var keys = Object.keys(dictionary);
  var searchType = {
    exact: (keys, searchTerm) => {
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] === searchTerm) {
          console.log("Found a match");
          console.log(searchTerm);
        }
      }
    },
    partial: 0,
    begins: 0,
    ends: 0
  };
}

module.exports = search;
