const dictionary = require('./modules/dictionary_reader.js');

// Reference sub modules
const ui = dictionary.ui;
const loader = dictionary.loader;

// First welcome the user.
ui.prompt.welcome();

// Now load the dictionary and scan for json files.
loader.scan().then(scanHandler);

function scanHandler(result) {
	if (typeof result === 'function') {
		// We got an error.
		throw result;
	}

	// If we make it here, we got some files.
	ui.display.listFiles(result);

  ui.prompt.ask_for_choice();

  ui.input.query( (data) => {
    data = data.trim().toLowerCase();
    if (data === 'q') {process.exit()};
    if (isNaN(+data)) {return;}


    
  })

}

/*
loader.scan()
	.then(one)
	.then(two, error);

function one(result) {

}

function two(result) {

}
function error() {

}
*/
