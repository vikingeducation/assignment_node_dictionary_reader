'use strict';

module.exports = {
	prompt: {
		welcome: () => {
			_showMessage({
				msg: "Welcome to Andrew & Ed's dictionary reader!\n" +
					"Select a dictionary to use, type 'q' to quit\n" +
					'============================================\n'
			});
		},
		askForChoice: () => {
			_showMessage({
				msg: 'Please select your choice: ',
				nl: false
			});
		},
		showStats: statsObj => {
			// Success message.
			_showMessage({
				msg: 'Successfully loaded: ' + statsObj.selectedDictionary
			});

			// Word count.
			_showMessage({
				msg: 'Word count: ' + statsObj.wordCount
			});

			// Letter frequency.
			for (var letter in statsObj.letterFrequency) {
				if (!statsObj.hasOwnProperty(letter)) {
					_showMessage({
						msg: letter.toUpperCase() + ': ' + statsObj.letterFrequency[letter]
					});
				}
			}
			console.log();
		},
		searchWelcome: () => {
			_showMessage({
				msg: 'You can now search this dictionary, muahahah\n' +
					'============================================\n' +
					'Search type:\n'
			});
		},
		askForSearchString: () => {
			_showMessage({
				msg: 'Please enter the string to search for: ',
				nl: false
			});
		},
		askToSaveResults: () => {
			_showMessage({
				msg: 'Save results? ',
				nl: false
			});
		},
		askForSaveFileName: () => {
			_showMessage({
				msg: 'Enter a filename: ',
				nl: false
			});
		},
		fileExists: () => {
			_showMessage({
				msg: "File exists already, overwrite?",
				nl: false
			});
		},

		fileSaved: () => {
			_showMessage({
				msg: 'Successfully saved file'
			});
		},

	},
	input: {
		query: dataHandler => {
			process.stdin.resume();
			process.stdin.setEncoding('utf8');
			process.stdin.on('data', dataHandler);
		}
	},
	//error_reporting: ,
	display: {
		list: items => {
			console.log(`\nFound ${items.length} result(s)`);
			items.forEach((el, idx) => {
				if (typeof el === 'object') {
					console.log(`> ${el.word}:  ${el.def}`);
				} else {
					console.log(`${idx + 1}: ${el}`);
				}
			});
		}
	}
};

// Inline function to handle
// message output
function _showMessage(msgObj) {
	if (msgObj.msg !== undefined) {
		if (msgObj.nl === undefined) {
			msgObj.msg += '\n';
		}
		process.stdout.write(msgObj.msg, msgObj.nl);
	}
	if (msgObj.err !== undefined) {
		console.error(msgObj.err);
	}
}
