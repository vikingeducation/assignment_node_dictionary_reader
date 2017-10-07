'use strict';
const fs = require('fs');
const dictionary = require('./dictionary');
const DICTIONARY_DIR_PATH = './data';

const loadFiles = () => {
	//this clears the screen for my windows10 computer
	let lines = process.stdout.getWindowSize()[1];
	for(let i = 0; i < lines; i++) {console.log('\r\n');}

	let dictionaryFiles = [];

	//Now create a loader module that scans the data/ directory for JSON files
	fs.readdir(DICTIONARY_DIR_PATH, (err, files) => {
		if (err) throw err;

		dictionaryFiles = files; // array of files

		console.log('Select a dictionary to load:');

		for (let i = 0; i < dictionaryFiles.length; i++) {
			let selectionNumber = i+1;
			let filename = dictionaryFiles[i];
			console.log(`${selectionNumber}. ${filename}`);
		}
		console.log('\n' + '> ');

		//receive user input re: dictionary selection
		process.stdin.resume();
		process.stdin.setEncoding('utf8');
		
		process.stdin.on('data', (data) => {
			let userDictionarySelection = data.trim();
			if(userDictionarySelection === '\\q') {
				console.log('Goodbye!');
				process.exit();
			} else {
				//validate input
				if ((userDictionarySelection >=	1) && (userDictionarySelection <= dictionaryFiles.length)) {
					//GOTO next state
					let dictionaryFile = dictionaryFiles[userDictionarySelection-1];
					dictionary.parse(dictionaryFile);
				} else {
					console.log(`Please select choice(s) from 1 to ${dictionaryFiles.length}`);
				}
			}
		});
	});
};

module.exports = {
	loadFiles: loadFiles
};
