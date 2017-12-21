// Does node automatically assume that parameters are optional? RE: err in showMessage
// Why am I having issues with the final console.log?

function one() {
  // Start listening to STDIN
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  // Inline function to handle message output
  var showMessage = (err) => {
    console.log('State one');
    console.log('Type "next" to continue');
    if (err) {
      console.error(err);
    }
  };

  // Display message
  showMessage();

  // Handler for STDIN data event
  var onData = (data) => {
    data = data.trim();

    // If user input "next" let's go to the next state
    if (data === 'next') {
      process.stdin.pause();
      process.stdin.removeListener('data', onData) ;

      // ------------------------------------------
      // Go to next view here
      // ------------------------------------------
      two();

    } else {
      // All other input is invalid
      showMessage(`Invalid: ${ data }`);
    }
  };

  // Set the listener
  process.stdin.on('data', onData);
}

function two() {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  var showSecondMessage = (err) => {
    console.log('State two');
    console.log('Type next to continue');
    if (err) { console.log(err); }
  };

  showSecondMessage();

  var onData = (data) => {
    data = data.trim();
    if(data === 'next') {
      process.stdin.pause();
      process.stdin.removeListener('data', onData);

      // Go to next listener
      three();

    } else {
      showSecondMessage(`Invalid: ${ data }`);
    }
  }
  process.stdin.on('data', onData);
}

function three() {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  var showThirdMessage = (err) => {
    console.log('State three');
    console.log('Type next to quit');
    if (err) { console.log(err); }
  }

  showThirdMessage();

  var onData = (data) => {
    data = data.trim();
    if(data === 'next') {
      console.log('Goodbye');
      process.stdin.pause();
      process.stdin.removeListener('data', onData);
    } else {
      showThirdMessage(`Invalid: ${ data }`);
    }
  }
}

// Start the app
one();
