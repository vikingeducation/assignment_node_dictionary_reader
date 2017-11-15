const searches = require("./searches.js");

function dictionary_data(dictionary) {
  var count = Object.keys(dictionary).length;
  console.log(`Word Count: ${count}`);

  // counting X words
  var regex = /(?:^|\W)x(\w+)(?!\w)/;
  var matches = [];
  for (var k in dictionary) {
    if (regex.exec(k)) {
      matches.push(k);
    }
  }
  console.log(`There are ${matches.length} words that begin with 'X'.`);

  // counting Z words
  var regex = /(?:^|\W)z(\w+)(?!\w)/;
  var matches = [];
  var match = regex.exec(dictionary);
  for (var k in dictionary) {
    if (regex.exec(k)) {
      matches.push(k);
    }
  }

  console.log(`There are ${matches.length} words that begin with 'Z'.`);
}

module.exports = dictionary_data;
