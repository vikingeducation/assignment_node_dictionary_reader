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
      let parsed;
      fs.readFile(`${path}${dictArray[parseInt(input) - 1]}`, (err, data) => {
        if (err) {
          throw err;
        }
        console.log(typeof data);
        parsed = JSON.parse(data);
        let keysArray = Object.keys(parsed);
        console.log(`Successfully loaded ${dictArray[parseInt(input) - 1]}`);
        console.log(`Word count: ${Object.keys(parsed).length}`);
        let currentLetter = 'a';
        let count = 0;
        let dictObj = { }
        console.log('Word frequency by starting letter:');
        for (let i = 0; i < keysArray.length; i++) {
          if (dictObj.hasOwnProperty(keysArray[i][0])) {
            dictObj[keysArray[i][0]]++;
          } else {
            dictObj[keysArray[i][0]] = 1;
          }
        }
        let displayArray = Object.keys(dictObj);
        for(let i = 0; i < displayArray.length; i++){
          console.log(`${displayArray[i]}: ${dictObj[displayArray[i]]}`);
        }
        /*
        let regexCurrent = new RegExp('^a', 'i');
        if(regexCurrent.test(keysArray[i])){
          console.log('success');
          count++;
        }else{

        currentLetter = String.fromCharCode(currentLetter.charCodeAt(0) + 1);
        }
        console.log(keysArray[0], regexCurrent);

          console.log(`${currentLetter}: ${count}`);
        console.log(regexCurrent.test(keysArray[i]), count);
        /*if (!regexCurrent.test(keysArray[i])) {
          currentLetter = String.fromCharCode(
            currentLetter.charCodeAt(0) + 1
          );
          count = 0;
        }
        count++;
        if(!regexCurrent.test(keysArray[i])){
        console.log(`${currentLetter}: ${count}`);
        let count = 0;
            }*/

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
