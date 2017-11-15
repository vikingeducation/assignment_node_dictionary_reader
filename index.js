var dictionaries = require("./lib/loader.js");
var dictionary = require("./lib/dictionary.js");
var search = require("./lib/search.js");

var found = [];
// Start listening to STDIN
process.stdin.resume();
process.stdin.setEncoding("utf8");

let dicArray = [""];
let dictPath = "";

function start() {
  // Start listening to STDIN
  process.stdin.resume();
  process.stdin.setEncoding("utf8");

  // Set the listener

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

  // Handler for starting input
  let onData = data => {
    data = data.trim();

    if (data === "q") {
      process.exit();
    } else if (!isNaN(data) && dicArray[Number(data) - 1]) {
      dictPath = "./data/" + dicArray[Number(data) - 1];
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

  //Enter search term

  let onSearch = data => {
    let searchType = data.trim();
    console.log("Please enter your search term:");
    process.stdin.removeAllListeners("data");
    process.stdin.on("data", data => {
      let searchTerm = data.trim();
      dictionaries.loadDictionary(dictPath).then(loadedDictionary => {
        switch (searchType) {
          case "1":
            found = search(loadedDictionary, "exact", searchTerm);
            break;
          case "2":
            found = search(loadedDictionary, "partial", searchTerm);
            break;
          case "3":
            found = search(loadedDictionary, "begins", searchTerm);
            break;
          case "4":
            found = search(loadedDictionary, "ends", searchTerm);
            break;
          default:
            console.log("Invalid choice");
        }
        process.stdin.removeAllListeners("data");
        console.log("Do you want to save the results to a file? y/n?");
        process.stdin.on("data", onSaveChoice);
      });
    });
  };

  //do they want to save

  const onSaveChoice = data => {
    data = data.trim();
    if (data === "y") {
      console.log("What filepath should we write results to?");
      process.stdin.removeAllListeners("data");
      process.stdin.on("data", onSave);
    } else if (data === "n") {
      process.stdin.removeAllListeners("data");
      start();
    } else if (data === "q") {
      process.exit();
    }
  };

  //determines if existing file

  let onSave = data => {
    data = data.trim();
    let savePath = "./fileSaves/" + data;
    if (fs.existsSync(savePath)) {
      console.log("That file exists, overwrite? y/n?");
      process.stdin.removeAllListeners("data");
      process.stdin.on("data", data => {
        data = data.trim();
        saveOptions(data, savePath);
      });
    } else {
      saveFile(savePath);
    }
  };

  //determine if you want to overwrite

  let saveOptions = (data, savePath) => {
    console.log("In saveOptions");
    if (data == "y") {
      saveFile(savePath);
    } else if (data == "n") {
      process.stdin.removeAllListeners("data");
      start();
    } else if (data == "q") {
      process.exit();
    }
  };

  //saves file

  let saveFile = savePath => {
    console.log(savePath);
    fs.writeFile(savePath, found.join("\n"), "utf8", err => {
      if (err) {
        throw err;
      }
      console.log("File saved.");
    });
    process.stdin.removeAllListeners("data");
    start();
  };

  process.stdin.on("data", onData);
}

// Start the app
start();
