const dictionary = require('./modules/dictionary_reader.js');

// Reference sub modules
const ui = dictionary.ui;
const loader = dictionary.loader;

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
	ui.display.listFiles(result);
	ui.prompt.ask_for_choice();
	ui.input.query(selectHandler);
}

function selectHandler(selection) {
	selection = selection.trim().toLowerCase();
	if (selection === 'q') {
		process.exit(); // Exit everything.
	}

	selection = +selection;
	if (isNaN(selection) || selection < 1 || selection > loader.track.length) {
		console.log('Invalid choice, please try again.\n');
		ui.display.listFiles(result);
		ui.prompt.ask_for_choice();
		return;
	}

	// Valid selection.
	process.stdin.pause();
	loader.init(selection).then(handleInit);
}

function handleInit(result) {
	if (typeof result === 'function') {
		// We got an error.
		throw result;
	}

	ui.prompt.showStats({
		selectedDictionary: loader.selectedDictionary,
		wordCount: loader.getWordCount(),
		letterFrequency: loader.getLetterFrequency()
	});
}
