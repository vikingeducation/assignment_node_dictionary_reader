const fs = require("fs");
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
    console.log("Select a dictionary to load:");
    if (err) {
      console.error(err);
    } else {
      fs.readdir("../../data", (err, data) => {
        if (err) {
          throw err;
        }
        let files = data;
        files.forEach(function(file) {
          console.log(`1. ${file}`);
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

    if (data === "q") {
      process.exit();
    } else if (data === "1") {
      var path = ".";

      fs.readFile("../../data/dictionary.json", (err, data) => {
        if (err) {
          throw err;
        }
        dictionary = JSON.parse(data);
        console.log(typeof(dictionary))
        /*for (var k in dictionary) {
         console.log(dictionary[k])
       }*/
        var count = Object.keys(dictionary).length;

        var regex = /(^[a])/g;
        var matches = [];
       for (var k in dictionary){
      
          console.log(k)
          console.log(regex.exec(k))



       }
  
       
      });
    }
  };

  // Set the listener
  process.stdin.on("data", onData);
}

welcome();
