const saver = require('./saver.js');
const utils = require('./utils.js');

let searchFile = function(dict) {

  let selectedSearch;

  console.log(`\nWhat kind of search do you want?`);
  console.log(`================================`);
  console.log(`1: Exact match`);
  console.log(`2: Partial match`);
  console.log(`3: "Begins with" matches`);
  console.log(`4: "Ends with" matches`);
  console.log(`\n>>`);

  // start listening to stdin
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  let onData = (data) => {
  	data = data.trim();

    if (data === 'q') {
      utils.sayGoodbye();

    } else {
    
      let tempData = Number(parseInt(data));

      if ( utils.isInRange(1, 4, tempData)) {

    	  process.stdin.pause();
    	  process.stdin.removeListener('data', onData);

    	  selectedSearch = tempData;
        getSearchWord();

	    } else {
	      console.log(`Please select between range 1 and 4`);
      }
	  }	
  };

  process.stdin.on('data', onData);

  let getSearchWord = function () {
  	console.log(`\nEnter the search term:`);
  	console.log(`========================`);
  	console.log(`\n>>`);

  	process.stdin.resume();
  	process.stdin.setEncoding('utf8');
  	process.stdin.on('data', searchBy);
  };

  let searchBy = (word) => {
  	word = word.trim();

    if (word === '') {
      console.log(`Invalid input, please enter a word:`);

    } else if (word === 'q') {
      utils.sayGoodbye();

    } else {
      process.stdin.pause();
      process.stdin.removeListener('data', searchBy);

      let matches = [];
      let newDict = dict.map(a => {
      	return a.replace(/"/g, '')
      });

      // find matches
      switch (selectedSearch) {
      	case 1:
      	  matches = newDict.filter(function(element){
      	  	if (element === word) return element;
      	  });
      	  break;
      	case 2:
      	  matches = newDict.filter(function(element){
      	  	if (element.includes(word)) return element;
      	  });
      	  break;
      	case 3:
      	  matches = newDict.filter(function(element){
      	  	if (element.startsWith(word)) return element;
      	  });
      	  break;
      	case 4:
      	  matches = newDict.filter(function(element){
      	  	if (element.endsWith(word)) return element;
      	  });
      	  break;
      }

      if (matches.length === 0) {
      	console.log(`\nNo matches found`);	

      } else {
        console.log(`\nFound ${matches.length} matches:`);

        matches.forEach(function(item){
      	  console.log(item);
        });

	      saver.saveResults(matches.join('\n'));
      }
	  }	
  };
};

module.exports = {
	searchFile: searchFile
}