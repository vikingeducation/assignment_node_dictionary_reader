var currentState = 0;
var states = ['one', 'two', 'three'];

// Inline function to handle
// message output
function showMessage(msgObj) {
	console.log(`State ${states[currentState]}`);
	if (msgObj.msg !== undefined) {
		console.log(msgObj.msg);
	}
	if (msgObj.err !== undefined) {
		console.error(msgObj.err);
	}
}

// Handler for STDIN data
// event
function onData(data) {
	data = data.trim();

	// If user input "next"
	// let's go to the next
	// state
	if (data === 'next') {
		process.stdin.pause();
		process.stdin.removeListener('data', onData);

		switch (currentState) {
			case 2: // State 3
				// Exit
				console.log('Adios hombre!');
				process.exit();
				break;
		}
		currentState++;
		state();
	} else {
		// All other input is invalid
		showMessage({ err: `Invalid: ${data}` });
	}
}

function state() {
	// Start listening to STDIN
	process.stdin.resume();
	process.stdin.setEncoding('utf8');

	// Display message
	showMessage({
		msg: `Welcome to state ${states[currentState]}, type next to continue.`
	});

	// Set the listener
	process.stdin.on('data', onData);
}

// Start the app
state();
