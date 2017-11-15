'use strict';
function one() {
  // Start listening to STDIN
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  // Inline function to handle
  // message output
  var showMessage = err => {
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
  var onData = data => {
    data = data.trim();

    // If user input "next"
    // let's go to the next
    // state
    if (data === 'next') {
      process.stdin.pause();
      process.stdin.removeListener('data', onData);
      two();
      // ----------------------------------------
      // Go to next view here
      // ----------------------------------------
    } else {
      // All other input is invalid
      showMessage(`Invalid: ${data}`);
    }
  };

  // Set the listener
  process.stdin.on('data', onData);
}

let two = () => {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  // Inline function to handle
  // message output
  var showMessage = err => {
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
  var onData = data => {
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
      showMessage(`Invalid: ${data}`);
    }
  };
  process.stdin.on('data', onData);
};

let three = () => {
  console.log('Goodbye');
  process.exit();
};

// Start the app
one();
