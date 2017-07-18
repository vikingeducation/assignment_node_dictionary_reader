const dictionary = require('./modules/dictionary_reader.js');

// Reference sub modules
const ui = dictionary.ui;
const loader = dictionary.loader;
const searcher = dictionary.searcher;

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
	ui.prompt.ask_for_choice();
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
	process.stdin.pause();
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
	ui.display.list(searcher.search_menu);
	ui.prompt.ask_for_choice();

	// Getting the search type.
	ui.input.query(handleSearchType);

	console.log('Invalid choice, please try again.\n');
	ui.display.list(result);
	ui.prompt.ask_for_choice();

	// Getting the search string.
	ui.input.query(handleSearch);
}

function handleSearchType(selection) {
	selection = selection.trim();

	// Make sure we have a valid choice.
	_validateSelection(selection, searcher.search_menu.length);

	process.stdin.pause();
}

function handleSearch(searchString) {
	searchString = searchString.trim().toLowerCase();

	process.stdin.pause();
}

function _validateSelection(selection, max) {
	selection = +selection;
	if (isNaN(selection) || selection < 1 || selection > max) {
		return false;
	}
	return true;
}
