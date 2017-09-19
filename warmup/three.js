module.exports = {
  init: () => {
    // Start listening to STDIN
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    // Inline function to handle
    // message output
    var showMessage = (err) => {
      console.log('State three');
      console.log('Type "next" to continue');
      if (err) {
        console.error(err);
      }
    };

    // display message
    showMessage();

    // Handler for STDIN handler event
    var onData = (data) => {
      data = data.trim();

      if (data === 'next') {
        // if user inputs next
        process.stdin.pause();
        process.stdin.removeListener('data', onData);

        // Finish program
        console.log('Goodbye');
        process.exit();
      } else {
        // show error
        showMessage(`Invalid: ${ data }`);
      }
    };

    process.stdin.on('data', onData);
  }
};
