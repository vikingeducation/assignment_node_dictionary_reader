'use strict';

// Inline function to handle
// message output
function showMessage(msg) {
	console.error(msg);
}

// Handler for STDIN data
// event
function onData(data) {
	// Remove whitespace.
	data = data.trim();

	//process.stdin.pause();
	//process.stdin.removeListener('data', onData);
}
