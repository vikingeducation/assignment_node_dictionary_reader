'use strict';
const fs = require('fs');
const dic1 = require('./dictionary');
const DICTIONARY_DIR_PATH = './data';
const chalk = require('chalk');

const searchFile = (dictionaryFile) => {

	let userSearchType; 
	console.log('\nWhat kind of search?')
	console.log('1: Exact')
	console.log('2: Partial')
	console.log('3: Begins with')
	console.log('4: Ends with')
	process.stdout.write('\n' + '> ');

	process.stdin.resume();
	process.stdin.setEncoding('utf8');		

	//#2 - get search term from user
	let getUserSearchTermInput = (data) => {
		let userSearchTerm = data.trim();
		if (userSearchTerm === '\\q') {
			console.log('Goodbye!');
			process.exit();
		} else {
			/*
			process.stdin.pause();
			process.stdin.removeListener('data', getUserSearchTermInput);
			*/
			processSearchTerm(userSearchType, userSearchTerm); // usage: processSearchTerm(searchType, searchTerm)
			//
			//GOTO save (and final) state
			//
		};
	};	

	//#1 - get search type from user
	let getUserSearchTypeInput = (data) => {
		userSearchType = data.trim();
		if (userSearchType === '\\q') {
			console.log('Goodbye!');
			process.exit();
		} else {
			//validate user input	
			let lowerSelectionRange = 1; 
			let upperSelectionRange = 4;
			if ((lowerSelectionRange <= userSearchType) && (userSearchType <= upperSelectionRange)) {
				process.stdin.removeListener('data', getUserSearchTypeInput);
				//
				//GOTO next state
				//
				askUserSearchTerm(userSearchType);
			} else {
				console.log(`Please select choice(s) from ${lowerSelectionRange} to ${upperSelectionRange}`);
				process.stdout.write('> ');
			};
		}
	};
	process.stdin.on('data', getUserSearchTypeInput);		

	let askUserSearchTerm = (userSearchType) => {
		console.log('Enter the search term:');
		process.stdout.write('> ');	
		process.stdin.on('data', getUserSearchTermInput);
	};

	let processSearchTerm = (userType, userTerm) => {
		let wordsRegex = /"\w+":/g;
		let words = dictionaryFile.match(wordsRegex); // array of: ['"abashedly":', ... ]	
		let defnsRegex = /: +".*"/g;
		let defns = dictionaryFile.match(defnsRegex); // array of: [': "In an abashed manner."', ...]

		//simply remove extra quotes and colons etc
		words.forEach( (currentValue, index, array) => {words[index] = currentValue.replace('"', ''); });
		words.forEach( (currentValue, index, array) => {words[index] = currentValue.replace('":', ''); });
		defns.forEach( (currentValue, index, array) => {defns[index] = currentValue.replace(': "', ''); });
		defns.forEach( (currentValue, index, array) => {defns[index] = currentValue.replace('."', '.'); });

		switch(userType) {
			case '1': // exact match
				words.forEach( (currentValue, index, array) => {
					let theWord = words[index]; 
					let theDefn = defns[index];
					if (currentValue === userTerm) console.log(chalk.inverse(theWord) + `: ${theDefn}`);
				});
				break; 
			case '2': // partial match
				let myRegex = new RegExp(userTerm);
				words.forEach( (currentValue, index, array) => {
					let theWord = words[index]; 
					let theDefn = defns[index];
					//if match then quickly print out, because as I'm not storing words or defns!
					if (myRegex.test(currentValue)) {console.log(chalk.inverse(theWord) + `: ${theDefn}`); }
				});				
				break; 
			case '3': // 'begins with' match	
				break; 
			case '4': // 'ends with' match
				break; 
			default: 
				console.log('in switch default - unhandled condition - this should never happen!');
		}
	};
};

module.exports = {
	search: searchFile
}
