'use strict';

const init = () => {

  //manages *state* and *next* actions functions
  let state; 
  let next;

  const showMessage = (err, state) => {
    console.log(`\nState ${state}`);
    console.log('Type "next" to continue');
    if (err) {
      console.error(err);
    };
  };

  const resumeEntry = (state) => {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    showMessage(null, state);
  };

  const handleInput = data => {
    data = data.trim();
    if (data === 'next') {
      process.stdin.pause();
      process.stdin.removeListener('data', handleInput);
      next();
    } else {
      showMessage(`Invalid: ${ data }`, state);
    }
  }  

  const exit = () => {
    console.log('Goodbye!');
    process.exit();
  };

  //
  //if another state is needed, simply add them below
  //
  const three = () => {
    state = 'three';
    next = exit;
    resumeEntry(state);
    process.stdin.on('data', handleInput);
  };

  const two = () => {
    state = 'two';
    next = three;
    resumeEntry(state);
    process.stdin.on('data', handleInput);
  };

  const one = () => {
    state = 'one';
    next = two;
    resumeEntry(state);
    process.stdin.on('data', handleInput);
  };

  //start with state one
  one();
}

//start the app
init();
