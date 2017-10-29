function two(data) {

  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  var showMessage = (err) => {
    console.log('State two');
    console.log('Type "next" to continue');
    if (err) {
      console.error(err);
    }
  };

  showMessage();

  var onData = (data) => {
    data = data.trim();

    if (data === 'next') {
      process.stdin.pause();
      process.stdin.removeListener('data', onData);

      three(data);

    } else {

      showMessage(`Invalid: ${ data }`);
    }
  };

  process.stdin.on('data', onData);
}

function three(data) {

    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    var showMessage = (err) => {
      console.log('State Three');
      console.log('Type "next" to continue');
      if (err) {
        console.error(err);
      }
    };

    showMessage();

    var onData = (data) => {
      data = data.trim();

      if (data === 'next') {
        process.stdin.pause();
        process.stdin.removeListener('data', onData);

        console.log('Goodbye!');

      } else {

        showMessage(`Invalid: ${ data }`);
      }
    };

    process.stdin.on('data', onData);
}


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
      // ----------------------------------------
      two();

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
