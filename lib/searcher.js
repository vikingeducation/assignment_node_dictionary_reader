let searcher = {};


searcher.exactMatch = function(dictionary, input) {
	let words = Object.keys(dictionary);
  console.log('input search ' + input);
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
  let regex = new Regexp(`.*${input}.*`, 'i')
  words.forEach(function(word) {
    word.
  })

}

module.exports = searcher;