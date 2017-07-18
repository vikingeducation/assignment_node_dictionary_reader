function menu(message, acceptable, callback) {
  // Start listening to STDIN
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  // Inline function to handle
  // message output
  var showMessage = err => {
    console.log(message);

    /*
    options,
     */
    console.log(`Options: ${acceptable.keys().join(' ')}`);
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
    if (acceptable.keys().includes(data)) {
      process.stdin.pause();
      process.stdin.removeListener('data', onData);

      callback(data);
    } else {
      // All other input is invalid
      showMessage(`Invalid: ${data}`);
    }
  };

  // Set the listener
  process.stdin.on('data', onData);
}

module.exports = menu;
