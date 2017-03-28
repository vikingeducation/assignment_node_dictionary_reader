var fs = require('fs');
var load = require('./load');
var dictDir = fs.readdirSync('./data/', 'utf-8')


var displayDicts = function() {
	dictDir.forEach( (el, index) => {
		console.log(`${index + 1}. ${el}`);
	});
}


process.stdin.resume();
process.stdin.setEncoding('utf8');

console.log("Welcome to the Node Dictionary Reader!\n\
======================================\n\
Enter q to quit\n\n");

function selectionInterface(){
	console.log("Select Dictionary to Load:")
	displayDicts();
	load.loader('dictionary.json');
	console.log(load.wordCount())

	process.stdin.on('data', (str) => {
		str = str.trim();
		str = parseInt(str)
		if (isNaN(str)) {
			console.error("please enter a number from the selected dictionary")
			//call to menu
		} //else if (str < dict.length || str === 0) {

		//} 


	});
}


selectionInterface();
	