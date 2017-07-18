function menu(message, acceptable, callback) {
  // Start listening to STDIN
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  // Inline function to handle
  // message output
  var showMessage = (err, acceptable) => {
    if (err) {
      console.error(err);
    }

    // show message
    console.log(message);

    /*
    options,
     */
    for (let option in acceptable) {
      console.log(`${option}. ${acceptable[option]}`);
    }
  };

  // Display message
  showMessage(null, acceptable);

  // Handler for STDIN data
  // event
  var onData = data => {
    data = data.trim();

    // If user input "next"
    // let's go to the next
    // state
    if (Object.keys(acceptable).includes(data)) {
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
