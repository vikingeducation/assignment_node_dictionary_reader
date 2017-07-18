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
		ask_for_choice: () => {
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
			_showMessage ({msg: "Please enter the string to search for: ", nl: false});


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
			items.forEach((el, idx) => {
					console.log(`${idx + 1}: ${el}`);
				
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
