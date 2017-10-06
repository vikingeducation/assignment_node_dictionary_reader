'use strict';

var state;
var next;

const init = () => {

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
      console.log('Goodbye!');
    } else {
      showMessage(`Invalid: ${ data }`, state);
    }
  }  

  const one = () => {
    state = 'one';
    resumeEntry(state);
    process.stdin.on('data', handleInput);
  }

  one();
}

init();
