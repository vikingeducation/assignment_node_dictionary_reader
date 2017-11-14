var dictionaries = require("./loader.js");
var dictionary = require("./dictionary.js");
var search = require("./search.js");

// Start listening to STDIN
process.stdin.resume();
process.stdin.setEncoding("utf8");

function start() {
  // Start listening to STDIN
  process.stdin.resume();
  process.stdin.setEncoding("utf8");

  // Inline function to handle
  // message output
  let dicArray = [""];
  let showMessage = err => {
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
  let onData = data => {
    data = data.trim();

    if (data === "q") {
      process.exit();
    } else if (!isNaN(data) && dicArray[Number(data) - 1]) {
      dictionary(dicArray[Number(data) - 1]);
      console.log("What kind of search would you like to perform?");
      console.log("1. Exact");
      console.log("2. Partial");
      console.log("3. Begins With");
      console.log("4. Ends With");
      process.stdin.removeAllListeners("data");
      process.stdin.on("data", onSearch);
    } else {
      console.log("Invalid choice");
    }
  };

  let onSearch =  data => {
    data = data.trim();
    let searchTerm = getSearchTerm();
    if (data) {
      case "1": search(dictionaries.loadDictionary, "exact", searchTerm);
      case "2": search(dictionaries.loadDictionary, "partial", searchTerm);
      case "3": search(dictionaries.loadDictionary, "begins", searchTerm);
      case "4": search(dictionaries.loadDictionary, "ends", searchTerm);
      default: console.log("Invalid choice");
    }
  }

  let getSearchTerm = data => {
    data = data.trim();

    return data;
  }

  // Set the listener
  process.stdin.on("data", onData);
}

// Start the app
start();
