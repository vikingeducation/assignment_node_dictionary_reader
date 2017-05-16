const init = () => {

  // Manages current state and the next function and passes them to helpers
  var state;
  var next;

  // Inline function to handle
  // message output
  const showMessage = (err, state) => {
    console.log(`State ${state}`);
    console.log('Type "next" to continue');
    if (err) {
      console.error(err);
    }
  };

  const resumeEntry = (state) => {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    showMessage(null, state);
  };

  const handleInput = (data) => {
    data = data.trim();
      if (data === 'next') {
        process.stdin.pause();
        process.stdin.removeListener('data', handleInput);
        next();
      } else {
        showMessage(`Invalid: ${ data }`, state);
      }
  };

  const exit = () => {
    console.log("Goodbye.");
    process.exit();
  };

  const three = () => {
    state = "three";
    next = exit;
    resumeEntry(state);
    process.stdin.on('data', handleInput);
  };

  const two = () => {
    state = "two";
    next = three;
    resumeEntry(state);
    process.stdin.on('data', handleInput);
  };

  const one = () => {
    state = "one";
    next = two;
    resumeEntry(state);
    process.stdin.on('data', handleInput);
  };

  one();

};

// Start the app
init();