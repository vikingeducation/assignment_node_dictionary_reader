var fs = require('fs');
var load = require('./load');
var search = require('./search');
var ui = require('./ui');

var dictDir = fs.readdirSync('./data/', 'utf-8')
var selectedDictionary;
var searchSelection;

var displayDicts = function() {
	dictDir.forEach( (el, index) => {
		console.log(`${index + 1}. ${el}`);
	});
}

process.stdin.resume();
process.stdin.setEncoding('utf8');

ui.welcome
displayDicts();

var onDataMenu = function (str) {
	str = str.trim();
	//need q to quit conditional
	var selection = parseInt(str)
	//Validation func
	if (isNaN(selection) || selection > dictDir.length || selection < 1) {
		console.error("please enter a number from the selected");
	} else {
		selection--;
		selectedDictionary = dictDir[selection];
		load.loader(selectedDictionary);
		load.letterCount();
		process.stdin.removeListener('data', onDataMenu);
	} //selected items display
}


process.stdin.on('data', onDataMenu);

var onDataSearch = function (str) {
	str = str.trim();

	var selection = parseInt(str)
	
	if (isNaN(selection) || selection > 4 || selection < 1) {
		console.error("please enter a number from the selected");
	} else {
		console.log(
		`What kind of search?
		1: Exact
		2: Partial
		3: Begins With
		4: Ends With`
		)
		searchSelection = selection;
		process.stdin.removeListener('data', onDataSearch);
	}

}
process.stdin.on('data', onDataSearch);

var onSearchInput = function (str) {
	console.log(selectedDictionary);
	str = str.trim();

	console.log("Enter the search term here:");
	search[searchSelection](selectedDictionary, str);
}

process.stdin.on('data', onSearchInput);




