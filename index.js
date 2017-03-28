const ui = require('./lib/ui');
const loader = require('./lib/loader');
const dict = require('./lib/dict');


// Start program
ui.welcome();
const dictionaries = loader.findDictionaries();
ui.displayDictionaries(dictionaries)

// Start interactive part
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', (str) => {
  str = str.trim();

  if (str === 'q' || str === 'quit') {
    console.log('Goodbye.');
    process.exit();
  }

  let dictionaryName = ui.chooseDictionary(dictionaries, str);
  if (dictionaryName) {
  	process.stdin.pause();
  	let dictionary = loader.loadFile(dictionaryName);
    dict.displayStats(dictionary);
  } else {
  	console.log('Please choose a valid dictionary')
  	ui.displayDictionaries(dictionaries)
  }


});
