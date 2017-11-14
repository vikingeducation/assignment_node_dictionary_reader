fs = require("fs");

function loadDictionary(path) {
  fs.readFile("../data/" + path, "utf8", (err, data) => {
    if (err) {
      throw err;
    }
    console.log(`Successfully loaded ${path}!`);
    data = JSON.parse(data);
    console.log("number of keys " + Object.keys(data).length);
    console.log("Word frequency by starting letter: ");
    var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    var letterCount = new Array(26);
    var keys = Object.keys(data);

    for (let i = 0; i < alphabet.length; i++) {
      let letter = alphabet[i];
      var regex = `/\A${letter}/g`;
    }
  });
}

module.exports = loadDictionary;
