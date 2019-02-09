function one() {
  var level = 1;

  // Start listening to STDIN
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  // Inline function to handle
  // message output
  var showMessage = (err, stateMessage='State one') => {
    console.log(stateMessage);
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
    if (data === 'next' && level == 1) {
      showMessage('State Two');
      level += 1;

      // ----------------------------------------
      // Go to next view here
      // ----------------------------------------

    } else if (data === 'next' && level == 2) {
        showMessage('State Three');
        level += 1;

    } else if (data === 'next' && level == 3) {
        console.log('GoodBye');
        process.stdin.pause();
        process.stdin.removeListener('data', onData);

      } else {
      // All other input is invalid
      showMessage(`Invalid: ${ data }`);
    }
    console.log(level)
  };

  // Set the listener
  process.stdin.on('data', onData);
}

// Start the app
one();