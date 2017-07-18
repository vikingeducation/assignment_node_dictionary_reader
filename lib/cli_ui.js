const loader = require("./load.js");


//listen for user_input

function startMessage() {

  // Start listening to STDIN
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  // Inline function to handle
  // message output
  var showMessage = (err) => {
    console.log('Welcome to the fabulous Dictionary Ready!');
    console.log("====================================");
    console.log("Enter q to quit\n");
    console.log("Select a dictionary:")

    let dictData = loader.getDicts();

    dictData.then(function() {
      for (let i = 0; i < dictData.length; i++) {
        let dictString = `${i + 1}. ${dictData[i]}`;
        console.log(dictString);
      }
    });

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

// Start the app
startMessage();
