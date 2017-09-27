const fs = require('fs');

let saveResults = function(results) {

  console.log(`Do you want to save results? y/n or q to quit?`);

  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  let onData = (data) => {
  	data = data.trim();

    if (data === 'q') {
      console.log('Goodbye.');
      process.exit();

    } else {
    	
      process.stdin.pause();
      process.stdin.removeListener('data', onData);

      if ( data === 'y') {
        console.log('What filepath should we write results to?');
        getFileName(results);

      } else {
        console.log("Goodbye.");
        process.exit();

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
	  	// file exists
	  	process.stdin.pause();
        process.stdin.removeAllListeners('data');
        fileOverwrite(results, path);

      } else {
        // save the data in file
        fs.writeFile(path, results, 'utf8', (err) => {
          if (err) console.log(err);

          console.log('The file has been saved!');
          process.exit();
        });
        
      }
    })
  })
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

      if( data != 'y' && data != 'n'){
          // error checking
          console.log('Please enter y/n');
          invalidInput = true;

      } else {
        process.stdin.pause();
        process.stdin.removeAllListeners('data');

        if ( data === 'y'){
          fs.writeFile(fileName, results, 'utf8', (err) => {
            if (err) console.log(err);

            console.log('File successfully overwritten!');
            process.exit();
          });
        } else {
          console.log('Goodbye!'); 
          process.exit();
        }
      }
    })
  }
};

module.exports = {
	saveResults: saveResults
};