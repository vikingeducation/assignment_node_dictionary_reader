var fs = require('fs');
var load = require('./load');
//var ui = require('ui');

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

	process.stdin.on('data', (str) => {
		str = str.trim();
		str = parseInt(str)
		if (isNaN(str) || str > dictDir.length || str < 1) {
			console.error("please enter a number from the selected");
		} else {
			str--;
			var selectedDictionary = dictDir[str];
			load.loader(selectedDictionary);
			console.log(load.wordCount());
			load.letterCount();
		} 


	});
}


selectionInterface();
	