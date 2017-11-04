// var ui = require('./interface');
// var dictData = require('./dict_data');
var loader = require('./loader');
// var saver = require('./saver');
// var searcher = require('./searcher');

// require('strict-mode')(function () {
//   var loader = require('loader')
//   exports.loader = loader
// })


function one() {

  // Start listening to STDIN
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  // Inline function to handle
  // message output
  var welcomeMessage = (err) => {
    if (err) {
      console.error(err + '\n');
    }
    console.log('Welcome to the Node Dictionary Reader!');
    console.log('======================================');
    console.log('Enter q to quit');

  };

  var dictsMessage = (err, arr) => {
    if (err) {
      console.error(err + '\n');
    }
    console.log('\nSelect a dictionary to load:');
    if (arr) {
      console.log(`0. ${arr}`);
    }
  }

  // Display message
  welcomeMessage();
  dictsMessage();


  // Handler for STDIN data
  // event
  var onData = (data) => {
    data = data.trim();

    if (data === 'next') {
      process.stdin.pause();
      process.stdin.removeListener('data', onData);

      // ----------------------------------------
      // Go to next view here
      // ----------------------------------------
      two();

    } else if (data === 'q') {
      process.stdin.pause();
      process.stdin.removeListener('data', onData);

      console.log('Goodbye!');
    } else {

      // All other input is invalid
      welcomeMessage(`Your input is incorrect: ${ data } !!!`);
      var arr = loader;
      // get loader, check files and pass the callback to dicts Message so it lists files
      dictsMessage(arr);
    }
  };

  // Set the listener
  process.stdin.on('data', onData);
}





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


// Start the app
one();

// module.exports = {
//   init: function() {
//     one()
//   }
// }
