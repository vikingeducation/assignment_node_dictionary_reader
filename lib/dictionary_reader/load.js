'use strict';
const fs = require('fs');
const dictionary = require('./dictionary');
const DICTIONARY_DIR_PATH = './data';
let dictionaryFiles = []; 
let dictionaryFile; // the user selected dictionary file is global

const loadFiles = () => {
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
		process.stdout.write('\n' + '> ');
		//console.log('\n' + '> ');
	});

	//receive user input re: dictionary selection
	process.stdin.resume();
	process.stdin.setEncoding('utf8');

	let getUserInput = (data) => {
		let userDictionarySelection = data.trim();
		if(userDictionarySelection === '\\q') {
			console.log('Goodbye!');
			process.exit();
		} else {
			//validate user input
			if ((userDictionarySelection >=	1) && (userDictionarySelection <= dictionaryFiles.length)) {
				dictionaryFile = dictionaryFiles[userDictionarySelection-1];
				process.stdin.pause();
				process.stdin.removeListener('data', getUserInput);
				//
				//GOTO next state
				//
				dictionary.parse(dictionaryFile);
			} else {
				console.log(`Please select choice(s) from 1 to ${dictionaryFiles.length}`);
				process.stdout.write('> ');
			}
		}
	};
	process.stdin.on('data', getUserInput);
};

module.exports = {
	loadFiles: loadFiles
};
