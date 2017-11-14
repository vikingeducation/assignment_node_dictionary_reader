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
      dictPath = "../data/" + dicArray[Number(data) - 1];
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
    let found = [];
    let searchType = data.trim();
    console.log("Please enter your search term:");
    process.stdin.removeAllListeners("data");
    process.stdin.on("data", data => {
      let searchTerm = getSearchTerm(data);
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
        process.stdin.on("data", onSaveChoice(found));
      });
    });
  };

  const onSaveChoice = (data, found) => {
    data = data.trim();
    if (data === "y") {
      console.log("What filepath should we write results to?");
      process.stdin.removeAllListeners("data");
      process.stdin.on("data", onSave);
    } else if (data === "n") {
      process.stdin.removeAllListeners("data");
      showMessage();
    } else if (data === "q") {
      process.exit();
    }
  };

  let onSave = data => {
    let savePath = "../fileSaves/" + data;
    if (fs.existsSync(savePath)) {
      console.log("That file exists, overwrite? y/n?")
      process.stdin.removeAllListeners("data");
      process.stdin.on("data", saveOptions(savePath));
    } else {
      saveFile(savePath);
    }
  };

  let saveOptions = (data, savePath) => {
    if (data == "y") {
      saveFile(savePath);
    } else if (data = "n") {
      process.stdin.removeAllListeners("data");
      showMessage();
    } else if (data == "q") {
      process.exit();
    }
  }

  let saveFile = savePath => {
    fs.writeFile(savePath, "utf8", (err) => {
      if (err) {
        throw err;
      }
      console.log("File saved.")
    });
  }

  let getSearchTerm = data => {
    data = data.trim();

    return data;
  };

  // Set the listener
  process.stdin.on("data", onData);
}

// Start the app
start();
