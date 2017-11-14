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
    console.log(dicArray);
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

    // If user input "next"
    // let's go to the next
    // state
    if (data === "q") {
      process.exit();
    }
    if (!isNaN(data)) {
      console.log(dicArray);
      if (dicArray[Number(data) - 1]) {

      } else {
        console.log("Invalid choice");
      }
    } else {
      /*

    if (data === "next") {
      process.stdin.pause();
      process.stdin.removeListener("data", onData);

      if (state === "State one") {
        two(state);
      } else if (state === "State two") {
        three(state);
      }
    }
    */
      // All other input is invalid
      showMessage(`Invalid: ${data}`);
    }
  };

  // Set the listener
  process.stdin.on("data", onData);
}

// Start the app
start();
