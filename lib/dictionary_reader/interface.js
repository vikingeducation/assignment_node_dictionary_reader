// var dictData = require('./dict_data');
var loader = require('./loader');
// var saver = require('./saver');
// var searcher = require('./searcher');

function one() {

  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  var welcomeMessage = (err) => {
    if (err) {
      console.error(err + '\n');
    }
    console.log('Welcome to the Node Dictionary Reader!');
    console.log('======================================');
    console.log('Enter q to quit');
  };

  var dictsMessage = (arr) => {
    if (!arr) {
      console.log('\nThere are no files in data folder! Please add the library file!');
    } else {
      console.log('\nSelect a dictionary to load:');
      arr.forEach( (el, idx) => {
        console.log(`${idx + 1}. ${el}`);
      })
    }
  }

  // Display message
  var arr = loader.files;
  welcomeMessage();
  dictsMessage(arr);


  var onData = (data) => {
    data = data.trim();
    if ( Number.isInteger(parseInt(data)) && data < arr.length + 1 && data > 0) {
      process.stdin.pause();
      process.stdin.removeListener('data', onData);

      console.log('We are going to method TWO')
      two(arr[data-1]);

    } else if (data === 'q') {
      process.stdin.pause();
      process.stdin.removeListener('data', onData);

      console.log('Goodbye!');
    } else {
      welcomeMessage(`Your input: ${ data } is just simply invalid. Please read again our plain English moron ! and type correct choice.`);
      dictsMessage(arr);
    }
  };

  process.stdin.on('data', onData);
}





function two(choice) {

  var dictionary = loader.getContent('../../data/', choice);
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  var showMessage = (err) => {

    console.log('Type "next" to continue');
    if (err) {
      console.error(err);
    }
  };

  function statsPrinter(dictionary) {
    var keys = Object.keys(dictionary);
    console.log('keys are:' + Object.keys(dictionary))
    console.log( "Word count: " + keys.length);
    console.log( "Word frequency by starting letter: ")

    'abcdefghijklmnopqrstuvwxyz'.split("").forEach( (letter) => {
      stats = 0;
      keys.forEach( (word) => {
        var matcher = new RegExp("^" + letter + "\\w+", "g");
        if ( matcher.test(word) ) {
          stats += 1;
        } else {
          return
        }
      })
      console.log(letter.toUpperCase() + ": " + stats);
    })
  };

  statsPrinter(dictionary);
  showMessage();
  // showStats();

  var onData = (data) => {
    data = data.trim();

    if (data === 'next') {
      process.stdin.pause();
      process.stdin.removeListener('data', onData);
      console.log(dictionary);
      // three(data);

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
