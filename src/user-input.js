const getJSON = require('./loader.js');

function startProgram() {

  // Initial instructions for program
  console.log('Welcome to the Node Dictionary Reader!');
  console.log('======================================');
  console.log('Type "start" to begin, or "q" to quit.\n');

  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  function initialListener(input) {
    input = input.trim();

    if (input === 'q') {
      console.log('Goodbye.');
      process.exit();
    } else if (input === 'start'){
      process.stdin.pause();
      process.stdin.removeListener('data', initialListener);
      getJSON();
    } else {
      console.log(`Invalid input: ${input}`);
    }
  }

  // event listener for user input
  // invoke callback function after user input
  process.stdin.on('data', initialListener);
}


module.exports = startProgram;
