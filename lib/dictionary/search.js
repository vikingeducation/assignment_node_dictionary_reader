const fs = require("fs");

let exact_matches = function(input) {
  console.log("made into loader");
  fs.readFile(`../../data/dictionary.json`, (err, data) => {
    if (err) {
      throw err;
    }

    dictionary = JSON.parse(data);
    let match;

    for (var k in dictionary) {
      if (input === k) {
        match = "yes";
        console.log(`Found 1 match: ${k}: ${dictionary[k]}`);
        process.exit();
      }
    }

    if (match === undefined) {
      console.log("No matches found.");
    }
  });
};

module.exports = exact_matches;
