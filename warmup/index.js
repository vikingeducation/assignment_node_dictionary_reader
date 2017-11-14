let state = 1;

function one() {

  // Start listening to STDIN
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  // Inline function to handle
  // message output
  var showMessage = (err) => {
    console.log('State one');
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
      two();
    } else {

      // All other input is invalid
      showMessage(`Invalid: ${ data }`);
    }
  };

  // Set the listener
  process.stdin.on('data', onData);
}

function two(){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  state++;
  console.log("You are in state ", state);
  var onData = (data) => {
    data = data.trim();

    // If user input "next"
    // let's go to the next
    // state
    if (data === 'next') {
      process.stdin.pause();
      process.stdin.removeListener('data', onData);
      three();
    }

  }
  process.stdin.removeAllListeners('data');
//Setting the listener
  process.stdin.on('data', onData);
}

function three(){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  state++;
  console.log("You are in state ", state);
  var onData = (data) => {
    data = data.trim();

    // If user input "next"
    // let's go to the next
    // state
    if (data === 'next') {
      process.stdin.pause();
      process.stdin.removeListener('data', onData);
    }

  }
  process.stdin.removeAllListeners('data');
//Setting the listener
  process.stdin.on('data', onData);

}

// Start the app
one();
