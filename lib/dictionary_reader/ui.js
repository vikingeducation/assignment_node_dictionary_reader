'use strict';
const load = require('./load');

const init = () => {
	//this clears the screen for my windows10 computer
	let lines = process.stdout.getWindowSize()[1];
	for(let i = 0; i < lines; i++) {console.log('\r\n');}

	console.log('Welcome to the Node Dictionary Reader!');
	console.log('======================================');
	console.log("Enter '\\q' to quit\n");

	load.loadFiles();
};

module.exports = {
	init: init
};