'use strict';

module.exports = {
	prompt: {
		welcome: () => {
			_showMessage({
				msg: "Welcome to Andrew & Ed's dictionary reader!\n" +
					"Select a dictionary to use, type 'q' to quit\n" +
					'============================================\n'
			})
		},
		ask_for_choice: () => {
			_showMessage({
				msg: "Please select your choice:",
				nl: 0
			})
		} 



	},
	input: {
		query: (dataHandler) => {
			process.stdin.resume();
			process.stdin.setEncoding('utf8');
			process.stdin.on('data', dataHandler);

		}
	},
	//error_reporting: ,
	display: {
		listFiles: files => {
			files.forEach((el, idx) => {
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
			msgObj.msg += "\n"
		}
		process.stdout.write(msgObj.msg, msgObj.nl);
	}
	if (msgObj.err !== undefined) {
		console.error(msgObj.err);
	}
}

// Handler for STDIN data
// event
function _onData(data) {
	// Remove whitespace.
	data = data.trim();

	//process.stdin.pause();
	//process.stdin.removeListener('data', onData);
}
