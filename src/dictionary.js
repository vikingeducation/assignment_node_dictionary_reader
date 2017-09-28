const fs = require('fs');
const search = require('./searcher.js');

let parseFile = function(file) {

  let path = `./data/${file}`;

  process.stdin.pause();

  fs.readFile(path, 'utf8', (err, data) => {

    if (err) {
      throw err;

    } else {
      let regex =/"\w+"/g;
      let words = data.match(regex);                          // words array from dictionary file
      let str = "abcdefghijklmnopqrstuvwxyz";                 // alphabet string

  	  console.log(`\nSuccessfully loaded: ${file}`);
      console.log( `Word count: ${words.length}` );

	    console.log('\nWord frequency by starting letter:');
	  
      // loop through alphabet string
	    for(let i=0; i<str.length; i++) {
  
	      let nextChar = str.charAt(i);
	      let letterCount = 0;

        // loop through words array from dictionary file
	      for (let x=0; x<words.length; x++){
	      
	        if (words[x].startsWith(nextChar, 1)) letterCount++; // word is in the "apple": format
	      }                                                      // so, start at second char

        // print out word count of each letter in alphabet
	      console.log (`${nextChar} : ${letterCount}`);  
      }

      // call function to search through the words array
	    search.searchFile(words);
    }  
  });
};

module.exports = {
	parseFile: parseFile
};
