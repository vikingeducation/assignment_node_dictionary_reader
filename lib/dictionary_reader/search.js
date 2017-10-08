'use strict';
const fs = require('fs');
const chalk = require('chalk');
const save = require('./save');

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
			process.stdin.pause();
			process.stdin.removeListener('data', getUserSearchTermInput);

			let userDictionaryResults = processSearchTerm(userSearchType, userSearchTerm); 
			let jsonResults = JSON.stringify(userDictionaryResults, null, '\t');
			//
			//GOTO save (and final) state
			//
			save.save(jsonResults);
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

	// usage: processSearchTerm(searchType, searchTerm)
	// returns: user's dictionary results from search
	let processSearchTerm = (userType, userTerm) => {
		let wordsRegex = /"\w+":/g;
		let words = dictionaryFile.match(wordsRegex); // array of: ['"abashedly":', ... ]	
		let defnsRegex = /: +".*"/g;
		let defns = dictionaryFile.match(defnsRegex); // array of: [': "In an abashed manner."', ...]
		let myRegex;
		let counter = 0;
		let matchedWords = [];
		let matchedDefns = [];
		let matchedResultsForTransport = {}; // this will store the object of matched words + defns. This will also be used as the return value. 

		//simply remove extra quotes and colons etc
		words.forEach( (currentValue, index, array) => {words[index] = currentValue.replace('"', ''); });
		words.forEach( (currentValue, index, array) => {words[index] = currentValue.replace('":', ''); });
		defns.forEach( (currentValue, index, array) => {defns[index] = currentValue.replace(': "', ''); });
		defns.forEach( (currentValue, index, array) => {defns[index] = currentValue.replace('."', '.'); });

		switch(userType) {
			case '1': // exact match
				myRegex = new RegExp('^' + userTerm + '$');
				break; 
			case '2': // partial match
				myRegex = new RegExp(userTerm);
				break; 
			case '3': // 'begins with' match	
				myRegex = new RegExp('^' + userTerm);
				break; 
			case '4': // 'ends with' match
				myRegex = new RegExp(userTerm + '$');
				break; 
			default: 
				console.log('in switch default - unhandled condition - but this should never happen!');
		}

		words.forEach( (currentValue, index, array) => {
			if (myRegex.test(currentValue)) {
				counter++;
				matchedWords.push(currentValue);
				matchedDefns.push(defns[index]);
				matchedResultsForTransport[currentValue] = defns[index];
			}
		});

		if (counter === 0 ) {
			console.log(chalk.bgRed('No matches found.'));
		} else if (counter === 1) {
			console.log(chalk.bgBlue('Found 1 match:'));
		} else {
			console.log(chalk.bgBlue(`Found ${counter} matches:`));
		}

		for (let i = 0; i < matchedWords.length; i++) {
			let theWord = chalk.inverse(matchedWords[i]); 
			let itsDefn = matchedDefns[i];
			console.log(`${theWord}: ${itsDefn}`); 
		}
		return matchedResultsForTransport;
	};
};

module.exports = {
	search: searchFile
}
