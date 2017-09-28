const fs = require('fs');
const dictionary = require('./dictionary.js');
const utils = require('./utils.js');


let path = './data';
let matches = [];   // array containing dictionary files

let loadFiles = function() {

  // get list of dictionary files and print list
  fs.readdir(path, (err, data) => {

    if (err) {
      throw err;

    } else {
      // find all json files in directory
      let regex =/\w+\.(json)/g;
      let match = regex.exec(data);

	    console.log(`Select a dictionary to load:`);
	    console.log(`============================`);

      // get each match and pop off last array element 
      // because outpur looks like this:
      // dictionary.json, .json
      // test.json, .json
      while (match) {
        match.pop();
        matches.push(match);
        match = regex.exec(data);
      }

      let num = 1;
      matches.forEach( (file) => {
        console.log( `${num}. ${file}` );  
        num++;
      });

      console.log(`\n>>`);
	  }
  });	


  // Start listening to STDIN
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  // select one dictionary from list and parse it
  // 'q' to quit and error check input
  let onData = (data) => {
  	data = data.trim();

    if (data === 'q') {
      utils.sayGoodbye();

    } else {
      	
      // convert user input of dictionary selection to number  
      let tempData = Number(parseInt(data));

      if ( utils.isInRange(1, matches.length, tempData) ) {
      	let fileName = matches[data-1][0];

    	  process.stdin.pause();
    	  process.stdin.removeListener('data', onData);
    	
        // call function to parse dictionary file
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