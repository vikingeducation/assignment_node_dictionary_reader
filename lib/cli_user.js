let path = require('path');

console.log(`
     Welcome to the node dictionary reader
     =====================================
     Type q to quit
`)

let loader = require('./loading.js');


function one() {

  // Start listening to STDIN
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  // Inline function to handle
  // message output

  var dictarr;

  var showMessage = (err) => {
    console.log('Select from available dictionaries');
    loader.availableDictionaries().then((result) => {
      let i = 0;
      result.forEach((item) => {
          console.log(i + ". " + item);
          i++;
      })

      dictarr = result
    });
}
/* console.log(item)}
 console.log("1: " + result[0])});
    loader.availableDictionaries().then(
    if (err) {
      console.error(err);
    }
  };
*/
  // Display message
  showMessage();


  // Handler for STDIN data
  // event
  var onData = (data) => {
    data = data.trim();

    // If user input "next"
    // let's go to the next
    // state
    if (data === 'next') {
      process.stdin.pause();
      process.stdin.removeListener('data', onData);

      // ----------------------------------------
      // Go to next view here
      // ----------------------------------------

    } else if (Number(data) != NaN) {

      let num = Number(data)

      //console.log('this is the output of the array' + ' ' + dictarr[num]);
      var pathname = path.join(__dirname, "..", "/data" + `/${dictarr[num]}`)

      //loader.loadFile(pathname)

      loader.loadFile(pathname).then((result) => {
        let letterCount = (words) => {
          letter_count = {};
          for (let i = 0; i < words.length; i++) {
            if (letter_count[words[i][0].toLowerCase()] === undefined) {
              letter_count[words[i][0].toLowerCase()] = 1;
            } else {
              letter_count[words[i][0].toLowerCase()] += 1;
            }
          }
          return letter_count;
        }
        // Logging letter counts
        console.log(letterCount(Object.keys(result)));

        //creating variable for the dictionary's data

        var dictionaryData = result;

        let search = require('./search.js')

        //console.log(search.exactMatch(dictionaryData, 'abate'));

        console.log(search.beginMatch(dictionaryData, 'ab'));
        //return result
      })


      //console.log(search.exactMatch(dictionaryData, 'abate'))
    } else {

      // All other input is invalid
      showMessage(`Invalid: ${ data }`);
    }
  };

  // Set the listener
  process.stdin.on('data', onData);
}

// Start the app
one();
