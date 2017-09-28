const fs = require('fs');
const utils = require('./utils.js');

let saveResults = function(results) {

  console.log(`Do you want to save results? y/n or q to quit?`);

  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  let onData = (data) => {
  	data = data.trim();

    if (data === 'q') {
      utils.sayGoodbye();

    } else {
    	
      process.stdin.pause();
      process.stdin.removeListener('data', onData);

      if ( data === 'y') {
        console.log('Please enter filename to save results to:');
        getFileName(results);

      } else {
        utils.sayGoodbye();

      }
	  }
  };
	
  process.stdin.on('data', onData);  	
};


let getFileName = function(results) {

  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  process.stdin.on('data', function(data) {

    data = data.trim();

    let path = `./data/${data}`;

    fs.open(path, 'wx', (err, fd) => {

	    if (err) {
        // file exists, prompt for overwrite
	  	  process.stdin.pause();
        process.stdin.removeAllListeners('data');
        fileOverwrite(results, path);

      } else {
        // save the data in file
        utils.saveFile(path, results, 'The file has been saved!');
      }
    });
  });
};

let fileOverwrite = function (results, fileName) {
  console.log('That file exists, overwrite? y/n?');

  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  let invalidInput = true;

  while (invalidInput) {

    invalidInput = false;

    process.stdin.on('data', function( data ){

      data = data.trim();

      if (!['y', 'n'].includes(data)) {
          // error checking
          console.log('Please enter y/n');
          invalidInput = true;

      } else {
        process.stdin.pause();
        process.stdin.removeAllListeners('data');

        if ( data === 'y'){
          // overwrite file with new results
          utils.saveFile(fileName, results, 'File successfully overwritten!');

        } else {
          utils.sayGoodbye();

        }
      }
    });
  }
};

module.exports = {
	saveResults: saveResults
};