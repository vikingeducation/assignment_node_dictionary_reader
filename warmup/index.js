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
      process.stdin.pause();
      process.stdin.removeListener('data', onData);

      // ----------------------------------------
      // Go to next view here
      two();

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
one();



function two() {
  process.stdin.resume();
  console.log('State two');
  console.log('Type "next" to continue');

  function innerTwo(data) {
    data = data.trim();

    if (data === 'next') {
      process.stdin.pause();
      process.stdin.removeListener('data', innerTwo);
      three();
    } else {
      console.log(`Invalid input: ${data}`);
    }
  }

  process.stdin.on('data', innerTwo);
}


function three() {
  process.stdin.resume();
  console.log('State three');
  console.log('Type "next" to exit');

  function innerThree(data) {
    data = data.trim();

    if (data === 'next') {
      console.log('Goodbye');
      process.exit();
    } else {
      console.log(`Invalid input: ${data}`);
    }
  }

  process.stdin.on('data', innerThree);
}
