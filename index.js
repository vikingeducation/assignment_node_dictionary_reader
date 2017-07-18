'use strict';

// Load dictionary module.
const dictionary = require('./modules/dictionary_reader.js');

// Reference sub modules
const ui = dictionary.ui;
const loader = dictionary.loader;
const searcher = dictionary.searcher;
const saver = dictionary.saver;

// First welcome the user.
ui.prompt.welcome();

// Now load the dictionary and scan for json files.
loader.scan().then(handleScan);

function handleScan(result) {
	if (typeof result === 'function') {
		// We got an error.
		throw result;
	}

	// If we make it here, we got some files.
	ui.display.list(result);
	ui.prompt.askForChoice();
	ui.input.query(handleSelect);
}

function handleSelect(selection) {
	selection = selection.trim().toLowerCase();
	if (selection === 'q') {
		process.exit(); // Exit everything.
	}

	// Make sure we have a valid choice.
	_validateSelection(selection, loader.track.length);

	// Valid selection.
	process.stdin.removeListener('data', handleSelect);
	loader.init(selection).then(handleInit);
}

function handleInit(result) {
	if (typeof result === 'function') {
		// We got an error.
		throw result;
	}

	// Show dictionary statistics.
	ui.prompt.showStats({
		selectedDictionary: loader.selectedDictionary,
		wordCount: loader.getWordCount(),
		letterFrequency: loader.getLetterFrequency()
	});

	// Start search module.
	ui.prompt.searchWelcome();
	ui.display.list(searcher.searchMenu);
	ui.prompt.askForChoice();

	// Getting the search type.
	ui.input.query(handleSearchType);

	/*console.log('Invalid choice, please try again.\n');
	ui.display.list(result);
	ui.prompt.askForChoice();
 */
}

function handleSearchType(selection) {
	selection = selection.trim();

	// Make sure we have a valid choice.
	_validateSelection(selection, searcher.searchMenu.length);
	searcher.setSearchType(selection);
	ui.prompt.askForSearchString();
	// Getting the search string.
	process.stdin.removeListener('data', handleSearchType);
	ui.input.query(handleSearch);
}

function handleSearch(searchString) {
	searchString = searchString.trim().toLowerCase();
	saver.results = searcher.search.execute(searchString, loader.entries);
	ui.display.list(saver.results);
	ui.prompt.askToSaveResults();

	process.stdin.removeListener('data', handleSearch);
	ui.input.query(handleAskForSave);
}

function handleAskForSave(answer) {
	answer = answer.trim().toLowerCase();
	if (answer === 'y') {
		ui.prompt.askForSaveFileName();
		ui.input.query(handleSave);
		process.stdin.removeListener('data', handleAskForSave);
	} else if (answer === 'n') {
		// Return to menu?
	} else {
		// Invalid answer
		ui.prompt.askToSaveResults();
	}
	
		process.stdin.removeListener('data', handleAskForSave);
}

function handleSave(filename) {
	filename = filename.trim();

	// Attempt to read the file, if it throws an error
	// it does not exist? Maybe?
	saver.check(filename).then(handleFileExists, saver.save).catch(handleFileSaved);
}

function handleFileSaved () {
	if (typeof result === 'function') {
			// An error occurred.
			throw result;
		}

		// Success
		ui.prompt.fileSaved();
}

function handleFileExists(filename) {
	ui.prompt.fileExists();
	ui.input.query( answer => {
		answer = answer.trim().toLowerCase();
		if (answer === 'y') {
			saver.save(filename).then(handleFileSaved);
		} else if (answer === 'n') {
		// Return to menu?
		} else {
		// Invalid answer
			ui.prompt.askToSaveResults();
		}
	});
	
};

function _validateSelection(selection, max) {
	selection = +selection;
	if (isNaN(selection) || selection < 1 || selection > max) {
		console.log('INVALID');
		return false;
	}
	return true;
}
