'use strict';
const load = require('./load');

const init = () => {
	console.log('Welcome to the Node Dictionary Reader!');
	console.log('======================================');
	console.log("Enter '\\q' to quit\n");

	load.loadFiles();
};

module.exports = {
	init: init
};