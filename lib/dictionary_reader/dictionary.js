'use strict';
const fs = require('fs');

const parseFile = (file) => {
	const DICTIONARY_FILE_PATH = `./data/${file}`;

	fs.readFile(DICTIONARY_FILE_PATH, 'utf8', (err, dictionaryFile) => {
		if (err) throw err;

		let regex = /"\w+":/g;

		let words = dictionaryFile.match(regex); // this is an array
		//words is now filled up like this: [ '"a:"', '"animal:"', ...]
		let wordCount = words.length;

		console.log(`Successfully loaded: ${file}`);
		console.log(`Word count: ${wordCount}`);
		console.log('Word frequency by starting letter:');

		let alphabet = 'abcdefghijklmnopqrstuvwxyz';
		for (let i = 0; i < alphabet.length; i++) { 	// going through a-z
			let currentLetter = alphabet.charAt(i); 	// a
			let letterCount = 0;						// word count for letter a

			for (let j = 0; j < words.length; j++) { 	// going through the words array
				let firstLetter = words[j].charAt(1);
				if (firstLetter === currentLetter) {
					letterCount++;
				}
			}
			console.log(`${currentLetter}: ${letterCount}`);
		};
	});
};

module.exports = {
	parse: parseFile
}
