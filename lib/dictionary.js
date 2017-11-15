var fs = require("fs");

function loadDictionary(path, callback) {
  fs.readFile("./data/" + path, "utf8", (err, data) => {
    if (err) {
      throw err;
    }
    console.log(`Successfully loaded ${path}!`);
    data = JSON.parse(data);
    console.log("number of keys " + Object.keys(data).length);
    console.log("Word frequency by starting letter: ");
    var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    var letterCount = new Array(26).fill(0);
    var keys = Object.keys(data);
    for (let i = 0; i < alphabet.length; i++) {
      let letter = alphabet[i];
      let regex = "^" + letter + "+";
      regex = new RegExp(regex, "gi");
      for (let n = 0; n < keys.length; n++) {
        if (regex.test(keys[n])) {
          letterCount[i] += 1;
        }
      }
      console.log(alphabet[i] + ": " + letterCount[i]);
    }
    callback();
  });
}

module.exports = loadDictionary;
