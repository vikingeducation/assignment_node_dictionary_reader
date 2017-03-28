const cliModule = {

  render: (stateName, data) => {
    let state = require(`../states/${ stateName }`)(data);
    console.log(state.prompt());

    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    const onData = (data) => {
      data = data.trim();
      if (data === 'q') {
        process.exit();
      } else if (state.isValid(data)) {
        process.stdin.pause();
        process.stdin.removeListener('data', onData);
        state.transition(data);
      } else {
        console.log(state.error);
        console.log(state.prompt());
      }
    };

  //   process.stdin.on('data', onData);
  // }
  }
};



// States:
// 1) Welcome. Send the intro message and list available dictionaries.
// 2) List available dictionaries







//   listFiles: (fileArray) => {
//     fileArray.forEach( (fileName, index) => {
//       console.log(`${index + 1}. ${fileName}`);
//     })
//   },

//   chooseFile: (input, fileList) => {
//     input = Number(input);
//     if (Number.isInteger(input) && input < fileList.length + 1 && input > 0) {
//       console.log(`Successfully loaded: ${fileList[input - 1]}`);
//       return fileList[input - 1];
//     } else {
//       console.error('Invalid entry. Enter a number in the list.');
//       return false;
//     }
//   },

//   searchprompt: () => {
//     console.log(`
// What kind of search?
// 1: Exact
// 2: Partial
// 3: Begins With
// 4: Ends With
//     `);
//   },

//   printWordCount: (wordCount) => {
//     console.log(`Word count: ${wordCount}`);
//   },

//   printWordFreq: (freq) => {
//     console.log('Word frequency by starting letter:');
//     for (letter in freq) {
//       console.log(`${letter}: ${freq[letter]}`);
//     }
//   }

// };

 module.exports = cliModule;
