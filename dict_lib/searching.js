var fs = require('fs');

var Searching = {

	search_file: function(file){
		return new Promise((resolve, reject) => {
			fs.readFile(`data/${file}`, (err, data) => {
				if(err){
					reject(err);
				}
				resolve(JSON.parse(data.toString()));
			});
		});
	},

	search_exact: function(file, word){
		Searching.search_file(file).then((results) => {
			if(results[word] == undefined){ console.log(`${word} was not found`) }
			else{ console.log(results[word]) }
		});
	},

	search_partial: function(file, word, search){
		var regex = Searching.make_regex(search, word);
 
		Searching.search_file(file).then((results) => {
			//for each definition in dictionary
			for(k in results){
				var match = k.match(regex);
				if(match){
				 	var matched_word = match['input'];
				 	console.log(`Word - ${matched_word}`);
				 	console.log(`Definition - ${results[k]}`);
				 	console.log('---------------------------\n');
				 }
				 else{`Search term ${word} not found\n`}
			}
		console.log(`\n Use 'save' to store results in a file`);
		});
	},

	make_regex: function(search, word){
		if(search == "partial"){ return new RegExp(word, "i"); }
		if(search == "beginning"){ return new RegExp(`^${word}`, "i") }
		if(search == "end"){ return new RegExp(`${word}$`, "i") }
	},
}

module.exports = Searching;