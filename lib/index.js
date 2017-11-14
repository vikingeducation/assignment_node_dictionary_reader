const fs = require('fs');
const dictInt = () => {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  console.log('Welcome to the Node Dictionary Reader!');
  console.log("Enter 'q' to quit");

  let path = '../data/';
  let dictArray = [];
  fs.readdir(path, (err, data) => {
    if (err) {
      throw err;
    }
    dictArray = data;
    console.log('Select Dictionary');
    for (i = 0; i < dictArray.length; i++) {
      console.log(`${i + 1} ${dictArray[i]}`);
    }
    process.stdin.on('data', onData);
  });

  var onData = input => {
    input = input.trim();

    // console.log(Number.isInteger(parseInt(input)));
    // console.log(parseInt(input) <= dictArray.length);

    if (input === 'q') {
      process.stdin.pause();
      process.stdin.removeListener('data', onData);
      process.exit();
    } else if (
      Number.isInteger(parseInt(input)) &&
      parseInt(input) <= dictArray.length
    ) {
      fs.readFile(`${path}${dictArray[parseInt(input) - 1]}`, (err, data) => {
        if (err) {
          throw err;
        }
        let parsed = JSON.parse(data);
        let keysArray = Object.keys(parsed);
        console.log(`Successfully loaded ${dictArray[parseInt(input)]}`);
        console.log(`Word count: ${Object.keys(parsed).length}`);
        console.log(Object.keys(parsed));
        let currentLetter = 'A';
        let count = 0;
        for (i = 0; keysArray.length; i++) {
          let regexCurrent = new RegExp(`/a/`, 'i');
          console.log(regexCurrent.test(keysArray[i]), count);
          if (!regexCurrent.test(keysArray[i])) {
            console.log(`${currentLetter}: ${count}`);
            currentLetter = String.fromCharCode(
              currentLetter.charCodeAt(0) + 1
            );
            count = 0;
          }
          count++;
        }
      });

      // All other input is invalid
    } else {
      console.log(`Invalid: ${input}`);
    }
  };
};

dictInt();
/*
process.stdin.resume();
  process.stdin.setEncoding('utf8');

  // Inline function to handle
  // message output
  var showMessage = err => {
    console.log('State one');
    console.log('Type "next" to continue');
    if (err) {
      console.error(err);
    }
  };

  // Display message
  showMessage();

  // Handler for STDIN data
  // event
  var onData = data => {
    data = data.trim();

    // If user input "next"
    // let's go to the next
    // state
    if (data === 'next') {
      process.stdin.pause();
      process.stdin.removeListener('data', onData);
      two();
      // ----------------------------------------
      // Go to next view here
      // ----------------------------------------
    } else {
      // All other input is invalid
      showMessage(`Invalid: ${data}`);
    }
  };

  // Set the listener
  process.stdin.on('data', onData);
}

let two = () => {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  // Inline function to handle
  // message output
  var showMessage = err => {
    console.log('State two');
    console.log('Type "next" to continue');
    if (err) {
      console.error(err);
    }
  };

  // Display message
  showMessage();

  // Handler for STDIN data
  // event
  var onData = data => {
    data = data.trim();
    */
