var dictionaries = require("./loader.js");
var dictionary = require("./dictionary.js");
var search = require("./search.js");

// Start listening to STDIN
process.stdin.resume();
process.stdin.setEncoding("utf8");

let dicArray = [""];
let dictPath = "";

function start() {
  // Start listening to STDIN
  process.stdin.resume();
  process.stdin.setEncoding("utf8");

  // Inline function to handle
  // message output
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
      dictPath = "../data/" + dicArray[Number(data) -1];
      dictionary(dicArray[Number(data) - 1], () => {
        console.log("What kind of search would you like to perform?");
        console.log("1. Exact");
        console.log("2. Partial");
        console.log("3. Begins With");
        console.log("4. Ends With");
        process.stdin.removeAllListeners("data");
        process.stdin.on("data", onSearch);
      });
    } else {
      console.log("Invalid choice");
    }
  };

  let onSearch = data => {
    let searchType = data.trim();
    console.log("Please enter your search term:");
    process.stdin.removeAllListeners("data");
    process.stdin.on("data", data => {
      let searchTerm = getSearchTerm(data);
      dictionaries.loadDictionary(dictPath).then(loadedDictionary =>
      {switch (searchType) {
        case "1":
          search(loadedDictionary, "exact", searchTerm);
          break;
        case "2":
          search(loadedDictionary, "partial", searchTerm);
          break;
        case "3":
          search(loadedDictionary, "begins", searchTerm);
          break;
        case "4":
          search(loadedDictionary, "ends", searchTerm);
          break;
        default:
          console.log("Invalid choice");
      }});
    });
  };

  let getSearchTerm = data => {
    data = data.trim();

    return data;
  };

  // Set the listener
  process.stdin.on("data", onData);
}

// Start the app
start();
