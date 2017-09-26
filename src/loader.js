const fs = require('fs');
const dict = require('./dictionary.js');

let path = './data';
let matches = [];

let loadFiles = function() {

  fs.readdir(path, (err, data) => {

    if (err) {
      throw err;

    } else {

      let regex =/\w+(.json)/g;
      let match = regex.exec(data);

	  console.log(`Select a dictionary to load:\n`);

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

  process.stdin.on('data', function(data) {
    data = data.trim();

    if (data === 'q') {
      console.log('Goodbye.');
      process.exit();

    } else {
      let tempData = Number(parseInt(data));

      if ( (tempData > 0) && (tempData <= matches.length) ){
      	let fileName = matches[data-1][0];
	    dict.parseFile(fileName);

	  } else {
	  	console.log(`Please select between range 1 and ${matches.length}`);
	  }

  	}
  });
};

module.exports = {
	loadFiles: loadFiles
};