let searcher = {};


searcher.exactMatch = function(dictionary, input) {
	let words = Object.keys(dictionary);
  let found = false;
	words.forEach(function(word){
		if (word == input) {
			console.log('Found 1 match');
			console.log(word);
      found = true;
      return;
		} 
	})
  if (!found) {
    console.log("No matches found");
  }
}

searcher.partialMatch = function(dictionary, input) {
  let words = Object.keys(dictionary);
  let matchWords = [];
  let count = 0;
  let regex = new RegExp(`.*${input}.*`, 'i')
  words.forEach(function(word) {
    if (regex.test(word)) {
      count += 1;
      matchWords.push(word);
    }
  });
  if (count) {
    console.log(`Found ${count} matches: `);
    matchWords.forEach(function(word){
      console.log(word);
    }); 
  } else {
    console.log('No matches found');
  }
}

searcher.beginsWithMatch = function(dictionary, input) {
  let words = Object.keys(dictionary);
  let matchWords = [];
  let count = 0;
  let regex = new RegExp(`^${input}.*`, 'i')
  words.forEach(function(word) {
    if (regex.test(word)) {
      count += 1;
      matchWords.push(word);
    }
  });
  if (count) {
    console.log(`Found ${count} matches: `);
    matchWords.forEach(function(word){
      console.log(word);
    }); 
  } else {
    console.log('No matches found');
  }
}

searcher.endsWithMatch = function(dictionary, input) {
  let words = Object.keys(dictionary);
  let matchWords = [];
  let count = 0;
  let regex = new RegExp(`.*${input}\$`, 'i')
  words.forEach(function(word) {
    if (regex.test(word)) {
      count += 1;
      matchWords.push(word);
    }
  });
  if (count) {
    console.log(`Found ${count} matches: `);
    matchWords.forEach(function(word){
      console.log(word);
    }); 
  } else {
    console.log('No matches found');
  }
}

module.exports = searcher;