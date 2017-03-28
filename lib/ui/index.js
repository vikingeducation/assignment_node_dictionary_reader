const loading = require("../loading");
//const dictionaryData = require("./lib/dictionaryData");

function runUI() {
  greeting();
  dictionarySelect();
}

function greeting() {
  console.log("Welcome to the Node Dictionary Reader!");
  console.log("======================================");
  console.log("Enter q to quit");
}

function dictionarySelect() {
  console.log("Select a dictionary to load:");
  var availableFiles = loading.readDir();

  for (var i = 0; i < availableFiles.length; i++) {
    console.log(i + 1 + ". " + availableFiles);
  }

  process.stdin.resume();
  process.stdin.setEncoding("utf8");

  process.stdin.on("data", function(str) {
    str = str.trim();
    userChoice = parseInt(str);

    if (userChoice > 0 && userChoice <= availableFiles.length) {
      process.stdin.pause();
      return availableFiles[userChoice - 1];
    } else {
      console.log("That value does not match an available dictionary");
    }
  });
}

module.exports = { runUI };
