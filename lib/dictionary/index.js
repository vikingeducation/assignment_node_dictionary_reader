
const fs = require('fs')
function welcome() {
  // Start listening to STDIN
  process.stdin.resume();
  process.stdin.setEncoding("utf8");

  // Inline function to handle
  // message output
  var showMessage = err => {
    console.log("Welcome to the Node Dictionary Reader!");
    console.log("======================================");
    console.log('Enter q to quit');
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

    } else {
     var path = '.';
fs.readdir('../../data', (err, data) => {
  if (err) {
    throw err;
  }
  console.log(JSON.parse(data));
});
      
    }
  };



  // Set the listener
  process.stdin.on("data", onData);
}
welcome()