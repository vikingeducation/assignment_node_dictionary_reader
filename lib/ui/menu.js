function menu(message, acceptable, callback) {
  // Start listening to STDIN
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  // Show message
  console.log(message);

  // Display options
  for (let option in acceptable) {
    console.log(`${option}. ${acceptable[option]}`);
  }

  // Handle input
  let onData = data => {
    data = data.trim();

    if (Object.keys(acceptable).includes(data)) {
      // Run callback if the user gave us an acceptable input
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
