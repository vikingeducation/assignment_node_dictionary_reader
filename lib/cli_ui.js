const loader = require("./load.js");


//listen for user_input
function startMessage() {

 // Start listening to STDIN
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

 // Inline function to handle message output
  function showMessage() {
    console.log('Welcome to the fabulous Dictionary Ready!');
    console.log("=========================================");
    console.log("Enter q to quit\n");
    console.log("Select a dictionary:")

   loader.getDicts( function (data) { // start of loader.getDicts
      for (let i = 0; i < data.length; i++) {
        let dictString = `${i + 1}. ${data[i]}`;
        console.log(dictString);
      }

     var repeat = true;
      while (repeat) { // start of while loop
        repeat = false;
        ///get user input
        process.stdin.on('data', function (input_data) { // start of process.stdin
          input_data = parseInt(input_data.trim());

         //not number
          if (isNaN(input_data)) {
            console.log ("It's not a number! Please, choose another.");
            repeat = true;
          }
          else if (input_data < 1 || input_data > data.length) {
            //range check
            console.log ("It's not in a range from 1 to " + data.length + ". Please, choose another.");
            repeat = true;
          } else {
            //read file
            loader.getFile( data[ input_data - 1], function() {
              var output;
            }); // end of loader.getFile
          }
        }); // end of process.stdin
      } //end of while loop
    }); // end of loader.getDicts
  } // end of showMessage

 showMessage();
}

// Start the app
startMessage();