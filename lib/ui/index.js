const loading = require('../loading');
const dictionaryData = require('../dictionaryData');

function runUI() {
  greeting();
  dictionarySelect();
  //dictionaryLoad(dictionarySelect());
}

function greeting() {
  console.log('Welcome to the Node Dictionary Reader!');
  console.log('======================================');
  console.log('Enter q to quit');
  console.log('');
}

function dictionarySelect() {
  console.log('Select a dictionary to load:');
  var availableFiles = loading.readDir();

  for (var i = 0; i < availableFiles.length; i++) {
    console.log(i + 1 + '. ' + availableFiles[i]);
  }

  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  process.stdin.on('data', function(str) {
    str = str.trim();

    if (str === 'q') {
      console.log('Goodbye!');
      process.exit();
    }

    //Prepare for users who will type ridiculous things
    userChoice = parseInt(str);
    //if it's not a number, will return NaN

    if (userChoice > 0 && userChoice <= availableFiles.length) {
      process.stdin.pause();

      var path = './data/' + availableFiles[userChoice - 1];
      dictionaryLoad(path);
    } else {
      console.log('That value does not match an available dictionary');
    }
  });
}

function dictionaryLoad(path) {
  console.log('Successful load!');

  console.log(dictionaryData.collectStats(path));
}

module.exports = { runUI };
