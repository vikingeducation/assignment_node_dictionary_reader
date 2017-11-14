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
        let dictObj = {};
        console.log('Word frequency by starting letter:');
        for (let i = 0; i < keysArray.length; i++) {
          if (dictObj.hasOwnProperty(keysArray[i][0])) {
            dictObj[keysArray[i][0]]++;
          } else {
            dictObj[keysArray[i][0]] = 1;
          }
        }
        let displayArray = Object.keys(dictObj);
        for (let i = 0; i < displayArray.length; i++) {
          console.log(`${displayArray[i]}: ${dictObj[displayArray[i]]}`);
        }
        process.stdin.pause();
        process.stdin.removeListener('data', onData);
        console.log('What type of search would you like to preform?');
        console.log('1. Exact');
        console.log('2. Partial');
        console.log('3. Begins with');
        console.log('4. Ends with');
        process.stdin.resume();
        process.stdin.on('data', data => {
          data = data.trim();
          onSearch(data, parsed);
        });
      });

      // All other input is invalid
    } else {
      console.log(`Invalid: ${input}`);
    }
  };
};

let onSearch = (input, parsed) => {
  console.log(input);
  let x = input;
  process.stdin.pause();
  process.stdin.removeAllListeners('data');
  console.log('What would you like to search for?');
  process.stdin.resume();
  process.stdin.on('data', data => {
    data = data.trim();
    const search = require('./search');
    console.log(search(input, data, parsed));
  });
};
let searchParams = (data, input, parsed) => {
//  const search = require('./search');
  // console.log(input, data);
 // console.log(search(input, data, parsed));
};
dictInt();
