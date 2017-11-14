function search(dictionary, userChoice, searchTerm) {
  var keys = Object.keys(dictionary);
  let found = [];
  const findMatches = (keys, regex) => {
    for (let i = 0; i < keys.length; i++) {
      if (regex.test(keys[i])) {
        found.push(keys[i]);
      }
    }
    return found;
  };
  const printMatches = found => {
    console.log("Found " + found.length + " Matches:");
    for (let i = 0; i < found.length; i++) {
      console.log(found[i]);
    }
  };
  var searchType = {
    exact: (keys, searchTerm) => {
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] === searchTerm) {
          console.log("Found a match");
          console.log(searchTerm);
        }
      }
    },
    partial: (keys, searchTerm) => {
      let regex = new RegExp(searchTerm);
      let found = findMatches(keys, regex);
      printMatches(found);
    },
    begins: (keys, searchTerm) => {
      searchTerm = "^" + searchTerm;
      let regex = new RegExp(searchTerm);
      let found = findMatches(keys, regex);
      printMatches(found);
    },
    ends: (keys, searchTerm) => {
      searchTerm = searchTerm + "$";
      let regex = new RegExp(searchTerm);
      let found = findMatches(keys, regex);
      printMatches(found);
    }
  };
  searchType[userChoice](keys, searchTerm);
}

module.exports = search;
