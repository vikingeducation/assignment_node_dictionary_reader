let searcher = {};


searcher.exactMatch = function(dictionary, input) {
	let words = Object.keys(dictionary);

	words.forEach(function(word){
		if (word == input) {
			console.log('Found 1 match');
			console.log(word);
		} else {
			console.log("No matches found");
		}
	})
}