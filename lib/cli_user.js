
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
  var showMessage = (err) => {
    console.log('Select from available dictionaries');
    loader.availableDictionaries().then((result) => {
      let i = 1;
      result.forEach((item) => {
          console.log(i + ". " + item);
          i++;
      })
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

    } else if (data === "1") {
      
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
