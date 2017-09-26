const fs = require('fs');
const dictionary = require('./dictionary.js');

let path = './data';
let matches = [];

let loadFiles = function() {

  // get list of dictionary files and print list
  fs.readdir(path, (err, data) => {

    if (err) {
      throw err;

    } else {

      let regex =/\w+(.json)/g;
      let match = regex.exec(data);

	  console.log(`Select a dictionary to load:`);
	  console.log(`============================`);
      while (match) {
        matches.push(match);
        match = regex.exec(data);
      }

      for (let i = 0; i < matches.length; i++) {
        console.log( `${i+1}. ${matches[i][0]}` );
      }

      console.log(`\n>>`);
	}
  });	


  // Start listening to STDIN
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  // select one dictionary from list and parse it
  //'q' to quit and error check input
  let onData = (data) => {
  	data = data.trim();

    if (data === 'q') {
      console.log('Goodbye.');
      process.exit();

    } else {
      	
      let tempData = Number(parseInt(data));

      if ( (tempData > 0) && (tempData <= matches.length) ){
      	let fileName = matches[data-1][0];

    	process.stdin.pause();
    	process.stdin.removeListener('data', onData);
    	
	    dictionary.parseFile(fileName);

	  } else {
	  	console.log(`Please select between range 1 and ${matches.length}`);

	  }
	}
  };

  process.stdin.on('data', onData);

};

module.exports = {
	loadFiles: loadFiles
};