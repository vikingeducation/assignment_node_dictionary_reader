const loading = require('./loading.js');

function init() {

  // Start listening to STDIN
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  // Inline function to handle
  // message output
  var welcomeMessage = (err) => {
    console.log('Welcome to the Node Dictionary Reader!');
    console.log('======================================');
    console.log('Enter q to quit');
    if (err) {
      console.error(err);
    }
  };

  // Display message
  welcomeMessage();
  let dictList = [];
  loading.list.then(function(result) {
    dictList = result;
    console.log("Select a dictionary to load: ");
    for(let i = 0;i < result.length; i++) {
        console.log(`${i+1}: ${result[i]}`);
    }
  }, function(err) {
    console.error(err);
  });

  // Handler for STDIN data
  // event
  var onData = (data) => {
    data = data.trim();

    if (data === 'q') {
      process.stdin.pause();
      process.stdin.removeListener('data', onData);
      process.exit();

    } else if (checkValidInput(data, dictList)) {
      loading.loadDict(dictList[data - 1]);
    } else {
      console.log('Choose a valid dictionary by number!');
    }
  };

  // Set the listener
  process.stdin.on('data', onData);
}

function checkValidInput(data, dictList) {
  if (parseInt(data) >= 1 && parseInt(data) <= dictList.length) {
    return true
  } else {
    return false
  }
}

module.exports = { init };
