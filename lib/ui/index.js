const loading = require("../loading");
const dictionaryData = require("../dictionaryData");
const search = require("../searching");

function runUI() {
  greeting();
  dictionarySelect();
}

function greeting() {
  console.log("Welcome to the Node Dictionary Reader!");
  console.log("======================================");
  console.log("Enter q to quit");
  console.log("");
}

function dictionarySelect() {
  console.log("Select a dictionary to load:");
  var availableFiles = loading.readDir();

  for (var i = 0; i < availableFiles.length; i++) {
    console.log(i + 1 + ". " + availableFiles[i]);
  }

  process.stdin.resume();
  process.stdin.setEncoding("utf8");

  process.stdin.on("data", function(str) {
    str = str.trim();

    if (str === "q") {
      console.log("Goodbye!");
      process.exit();
    }

    //Prepare for users who will type ridiculous things
    userChoice = parseInt(str);
    //if it's not a number, will return NaN

    if (userChoice > 0 && userChoice <= availableFiles.length) {
      process.stdin.pause();
      process.stdin.removeAllListeners("data");

      var path = "./data/" + availableFiles[userChoice - 1];
      dictionaryLoad(path);
    } else {
      console.log("That value does not match an available dictionary");
    }
  });
}

function dictionaryLoad(path) {
  console.log("Successful load!");

  console.log(dictionaryData.collectStats(path));

  searchDialogue(dictionaryData.dataObj.data);
}

function searchDialogue(data) {
  console.log("What kind of search would you like to perform?");
  console.log("1. Exact");
  console.log("2. Partial");
  console.log("3. Begins with");
  console.log("4. Ends with");

  process.stdin.resume();
  process.stdin.setEncoding("utf-8");

  process.stdin.on("data", function(searchNum) {
    searchNum = searchNum.trim();

    process.stdin.pause();
    process.stdin.removeAllListeners("data");

    searchListener(searchNum, data);
  });
}

function searchListener(searchNum, data) {
  console.log("What term would you like to search for?");
  process.stdin.resume();
  process.stdin.setEncoding("utf-8");

  process.stdin.on("data", function(searchStr) {
    searchStr = searchStr.trim();

    process.stdin.pause();
    process.stdin.removeAllListeners("data");

    if (searchNum === "1") {
      search.exactSearch(searchStr, data);
    } else if (searchNum === "2") {
      printResults(search.partialSearch(searchStr, data));
    } else if (searchNum === "3") {
      printResults(search.beginsWithSearch(searchStr, data));
    } else if (searchNum === "4") {
      printResults(search.endsWithSearch(searchStr, data));
    } else {
      console.log("That isn't an available option");
    }
  });

  function printResults(matches) {
    console.log("Number of matches: " + matches.length);
    console.log(matches);
  }
}

function saveDialog() {
  process.stdin.resume();
  process.stdin.setEncoding("utf-8");
  console.log("Do you want to save results? y/n? 'q' quits.");
  process.stdin.on("data", function(response) {
    response = searchNum.trim();
    if ("y" === response) {
      saveLocation();
    } else if ("n" === response || "q" === response) {
      process.stdin.exit();
    } else {
      console.log("not valid response");
    }
    process.stdin.pause();
    process.stdin.removeAllListeners("data");
  });
}

function saveLocation() {
  process.stdin.resume();
  process.stdin.setEncoding("utf-8");
  console.log("What filepath should we write results to?");
  process.stdin.on("data", function(searchNum) {
    searchNum = searchNum.trim();

    process.stdin.pause();
    process.stdin.removeAllListeners("data");
  });
}

module.exports = { runUI };
