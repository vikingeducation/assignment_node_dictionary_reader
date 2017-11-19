const fs = require("fs");
const exact_matches = require("./search.js");
const loader = require("./loader.js");
let files;

function welcome() {
  // Start listening to STDIN
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  let dictionary;
  // let files;

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

  var onData = data => {
    data = data.trim();
    loader(data, files);
  };

  // Set the listener
  process.stdin.on("data", onData);
}

welcome();
