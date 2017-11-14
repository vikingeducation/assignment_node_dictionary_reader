// Start listening to STDIN
process.stdin.resume();
process.stdin.setEncoding('utf8');

let state = "State one";

function one(state) {

  // Start listening to STDIN
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  // Inline function to handle
  // message output
  var showMessage = (state, err) => {
    console.log(state);
    console.log('Type "next" to continue');
    if (err) {
      console.error(err);
    }
  };

  // Display message
  showMessage(state);


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

      if (state === "State one") {
        two(state);
      } else if (state === "State two") {
        three(state);
      }

    } else {

      // All other input is invalid
      showMessage(`Invalid: ${ data }`);
    }
  };

  // Set the listener
  process.stdin.on('data', onData);
}

function two() {
  state = "State two";
  one(state);
}

function three() {
  console.log("Goodbye");
}

// Start the app
one(state);
