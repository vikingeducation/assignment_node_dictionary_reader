const fs = require('fs');
const search = require('./searcher.js');

let parseFile = function(file) {

  let path = `./data/${file}`;
  let numWords = 0;

  process.stdin.pause();

  fs.readFile(path, 'utf8', (err, data) => {
    if (err){
      throw err;

    } else {
      let regex =/"\w+"/g;
      let words = data.match(regex);
      let str = "abcdefghijklmnopqrstuvwxyz";

  	  console.log(`\nSuccessfully loaded: ${file}`);
      console.log( `Word count: ${words.length}` );

	  console.log('\nWord frequency by starting letter:');
	  
	  position = 0;
	  for(let i=0; i<str.length; i++) {

	    let nextChar = str.charAt(i);
	    let letterCount = 0;

	    for (let x=0; x<words.length; x++){
	      
	      if (words[x].startsWith(nextChar, 1)) letterCount++;
	    }

	    console.log (`${nextChar} : ${letterCount}`);  
      }

	  search.searchFile(words);
    }  
  });
};

module.exports = {
	parseFile: parseFile
};
