var dictionaryData = require('./dictionary_data');
var loader = require('./loader');
var saver = require('./saver');
var searcher = require('./searcher');


function cliInterface() {

  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  console.log('Welcome to the Dictionary');
  loader.displayDictionaries();



  // function showMessage(err) {
  //   console.log("Please enter a word or 'q' to quit");
  //   if (err) {
  //     console.error(err);
  //   }
  // };

  // showMessage();

  function onData(data) {
    var userInput = data.trim();
    console.log("Please enter a word or 'q' to quit");

    if (userInput === 'q') {
      process.stdin.pause();
      process.stdin.removeListener('data', onData);
    } else if (userInput === '1' || userInput === '2') {
      loader.setDictionary(userInput);
    } else {
      searcher(userInput);
    }
  };

  process.stdin.on('data', onData);


  // function prompt(message, validate, next, prevData) {
  // if (prevData) {
  //   console.log(`You just said ${ prevData }`);
  // }

  //   // Start listening to STDIN
  //   process.stdin.resume();
  //   process.stdin.setEncoding('utf8');

  //   console.log(message);

  //   onData = data => {
  //     data = data.trim();
  //     if (validate(data)) {
  //       process.stdin.pause();
  //       process.stdin.removeListener('data', onData);

  //       next(data);
  //     }
  //   };

  //   process.stdin.on('data', onData);
  // }


  // const next = prevData => {
  //   prompt(
  //     "Type the word bye",
  //     data => data === "bye",
  //     () => {
  //       console.log("Goodbye");
  //       process.exit();
  //     },
  //     prevData
  //   );
  // };


  // prompt(
  //   "Type the word hi",
  //   data => data === 'hi',
  //   next
  // );

}

module.exports = cliInterface;
