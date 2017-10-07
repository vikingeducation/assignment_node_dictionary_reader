'use strict';
const fs = require('fs');
const dictionary = require('./dictionary');

const loadFiles = () => {

	//this clears the screen for my windows10 computer
	let lines = process.stdout.getWindowSize()[1];
	for(let i = 0; i < lines; i++) {
	    console.log('\r\n');
	}

	const PATH = './data'; // path of dictionary files directory
	let dictionaryFiles = [];

	//Now create a loader module that scans the data/ directory for JSON files
	fs.readdir(PATH, (err, files) => {
		if (err) {
			throw err;
		} else {
			dictionaryFiles = files; // array of files
			//console.log(dictionaryFiles);
			//List the files the loader finds to the user and allow the user to select a dictionary file from a list: 
			console.log('Select a dictionary to load:');
			for (let i = 0; i < dictionaryFiles.length; i++) {
				let num = i+1;
				let file = dictionaryFiles[i];
				console.log(`${num}. ${file}`);
			}
			console.log('\n' + '> ');
		};
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
				//valid range defined by range of dictionary files
				if ((userDictionarySelection >=	1) && (userDictionarySelection <= dictionaryFiles.length)) {
					//console.log('in range');
					//next state
					//call out to dictionary.load
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
