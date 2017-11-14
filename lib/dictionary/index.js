const fs = require("fs");
const exact_matches = require("./search.js");

function welcome() {
  // Start listening to STDIN
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  let dictionary;
  let files;

  // Inline function to handle
  // message output
  var showMessage = err => {
    console.log("Welcome to the Node Dictionary Reader!");
    console.log("======================================");
    console.log("Enter q to quit");
    console.log("");
    console.log("Select a dictionary to load:");
    if (err) {
      console.error(err);
    } else {
      fs.readdir("../../data", (err, data) => {
        if (err) {
          throw err;
        }
        files = data;
        let i = 1;
        files.forEach(function(file) {
          console.log(`${i}. ${file}`);
          i++;
        });
      });
    }
  };

  // Display message
  showMessage();

  // Handler for STDIN data
  // event
  var onData = data => {
    data = data.trim();
    let path = files[data - 1];

    if (data === "q") {
      process.exit();
    } else if (parseInt(data) < 1 || parseInt(data) > files.length) {
      console.log("Please choose a valid dictionary option.");
    } else {
      fs.readFile(`../../data/${path}`, (err, data) => {
        if (err) {
          throw err;
        }
        console.log("Successfully loaded: dictionary.json!");
        dictionary = JSON.parse(data);
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

        // placeholder for search module
        console.log("What kind of search?");
        console.log("1: Exact");
        console.log("2: Partial");
        console.log("3: Begins With");
        console.log("4: Ends With");

        var test = exact_matches(data);
      });
    }
  };

  // Set the listener
  process.stdin.on("data", onData);
}

welcome();
