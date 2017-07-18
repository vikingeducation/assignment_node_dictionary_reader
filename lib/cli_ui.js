const loader = require("./load.js");


//listen for user_input

function startMessage() {

  // Start listening to STDIN
  debugger;
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  // Inline function to handle
  // message output
  var showMessage = (err) => {
    debugger
    console.log('Welcome to the fabulous Dictionary Ready!');
    console.log("=========================================");
    console.log("Enter q to quit\n");
    console.log("Select a dictionary:")

    loader.getDicts( function( data ){
      for (let i = 0; i < data.length; i++) {
        let dictString = `${i + 1}. ${data[i]}`;
        console.log(dictString);
      }


      var repeat = true;

      while (repeat) {
        repeat = false;
        ///get user input
        process.stdin.on('data', function( input_data ){
          input_data = parseInt(input_data.trim());

          //not number
          if (isNaN(input_data)) {
            console.log ("It's not a number! Please, choose another.");
            repeat = true;
          } else if (input_data < 1 || input_data > data.length) {
            //range check
            console.log ("It's not in a range from 1 to " + data.length + ". Please, choose another.");
            repeat = true;
          } else {
            //read file
            loader.getFile( data[ input_data - 1], function( ){
              //
              var output;
            });
          };
        });
      }
    });

    if (err) {
      console.error(err);
    }
  };

    // Display message


    // Handler for STDIN data
    // event
    var onData = (data) => {
      data = data.trim();

      // If user input "next"
      // let's go to the next
      // state
      if (data === 'next') {
        //process.stdin.pause();
        process.stdin.removeListener('data', onData);
        two();
        // ----------------------------------------
        // Go to next view here
        // ----------------------------------------

      } else {

        // All other input is invalid
        showMessage(`Invalid: ${ data }`);
      }
    };

    // Set the listener
    process.stdin.on('data', onData);
  }

  function two(){
    // Start listening to STDIN
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    // Inline function to handle
    // message output
    var showMessage = (err) => {
      console.log('State two');
      console.log('Type "next" to continue');
      if (err) {
        console.error(err);
      }
    };

    // Display message
    showMessage();


    // Handler for STDIN data
    // event
    var onData = (data) => {
      data = data.trim();

      // If user input "next"
      // let's go to the next
      // state
      if (data === 'next') {
        process.stdin.pause();
        process.stdin.removeListener('data', onData);
        three();
        // ----------------------------------------
        // Go to next view here
        // ----------------------------------------

      } else {

        // All other input is invalid
        showMessage(`Invalid: ${ data }`);
      }
    };

    // Set the listener
    process.stdin.on('data', onData);
  }
}

// Start the app
startMessage();