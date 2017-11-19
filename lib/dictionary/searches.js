const fs = require("fs");

let exact_matches = function(input) {
  fs.readFile("../../data/dictionary.json", (err, data) => {
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

let partial_matches = function(input) {
  fs.readFile("../../data/dictionary.json", (err, data) => {
    if (err) {
      throw err;
    }

    dictionary = JSON.parse(data);
    let match;
    let matchesword = [];
    var regex = `/(/\B${input}|${input}\B/}` / g;
    for (var k in dictionary) {
      if (regex.exec(k)) {
        matchesword.push([k, dictionary[k]]);
      }
    }

    if (matchesword.length === 0) {
      console.log("No matches found.");
      process.exit();
    }
    console.log(`Found ${matchesword.length} matches.`);
    for (var i = 0; i < matchesword.length; i++) {
      console.log(matchesword[i][0] + ":" + matchesword[i][1]);
    }
  });
};

let begin_with = function(input) {
  fs.readFile("../../data/dictionary.json", (err, data) => {
    if (err) {
      throw err;
    }

    dictionary = JSON.parse(data);
    let matchesword = [];
    var word = input;
    for (var k in dictionary) {
      if (k.slice(0, 3) === word) {
        matchesword.push([k, dictionary[k]]);
      }
    }

    if (matchesword.length === 0) {
      console.log("No matches found.");
      process.exit();
    }
    console.log(`Found ${matchesword.length} matches.`);
    for (var i = 0; i < matchesword.length; i++) {
      console.log(matchesword[i][0] + ":" + matchesword[i][1]);
    }
  });
};

let end_with = function(input) {
  fs.readFile("../../data/dictionary.json", (err, data) => {
    if (err) {
      throw err;
    }

    dictionary = JSON.parse(data);
    let matchesword = [];
    var word = input;
    for (var k in dictionary) {
      if (k.slice(-input.length) === word) {
        matchesword.push([k, dictionary[k]]);
      }
    }

    if (matchesword.length === 0) {
      console.log("No matches found.");
      process.exit();
    }
    console.log(`Found ${matchesword.length} matches.`);
    for (var i = 0; i < matchesword.length; i++) {
      console.log(matchesword[i][0] + ":" + matchesword[i][1]);
    }
  });
};

module.exports = { exact_matches, partial_matches, begin_with, end_with };
