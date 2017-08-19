var fs = require('fs');

var Saving = {
	process_file: function(file_path){
		fs.readFile(`data/${file_path}`, (err, data) => {
			if(err){
				throw err;
			}

			data = JSON.parse(data.toString());
			Saving.success_output(data, file_path);
		})
	},

	success_output: function(data, file_path){
		var total_words = Object.keys(data).length;
		var sorted = Object.keys(data).sort((a,b) => {
			return b.length - a.length;
		});
		var longest_word = sorted[0];
		var shortest_word = sorted[total_words-1]

		var success_str = `
			Successfully loaded ${file_path}
			--------------------------------

			There are ${total_words} words in this file
			The longest word is "${longest_word}" with a length of ${longest_word.length}
			The shortest word is "${shortest_word}" with a length of ${shortest_word.length}
		`;

		console.log(success_str);
	},
}

module.exports = Saving;