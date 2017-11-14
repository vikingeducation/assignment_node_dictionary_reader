var dictionaries = require("./loader.js");
var dictionary = require("./dictionary.js");

// Start listening to STDIN
process.stdin.resume();
process.stdin.setEncoding("utf8");

function start() {
  // Start listening to STDIN
  process.stdin.resume();
  process.stdin.setEncoding("utf8");

  // Inline function to handle
  // message output
  var dicArray = [""];
  var showMessage = err => {
    console.log("Welcome to the Node Dictionary Reader!");
    console.log("======================================");
    console.log("Enter q to quit");
    dicArray = dictionaries.arrayDictionaries;
    dictionaries.loaderFunction();
    if (err) {
      console.error(err);
    }
  };

  // Display message
  showMessage();

  // Handler for STDIN data
  // event
  var onData = data => {
    data = data.trim();

    if (data === "q") {
      process.exit();
    } else if (!isNaN(data) && dicArray[Number(data) - 1]) {
      dictionary(dicArray[Number(data) - 1]);
    } else {
      console.log("Invalid choice");
    }
  };

  // Set the listener
  process.stdin.on("data", onData);
}

// Start the app
start();
