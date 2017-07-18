'use strict';

module.exports = {
  prompting: {
    welcome: () => _showMessage({msg: 'Welcome to Andrew & Ed\'s dictionary reader!'}), 

  },
  acceptance: ,
  error_reporting: ,
  display: ,
}


// Inline function to handle
// message output
function _showMessage(msgObj) {
  if (msgObj.msg !== undefined) {
    console.log(msgObj.msg);
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
