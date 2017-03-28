const ui = require('./lib/ui');
const loader = require('./lib/loader');
const dict = require('./lib/dict');
const searcher = require('./lib/searcher');

let dictionaryActive = false;
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

  if (dictionaryActive) {
    let searchOption = str;
    console.log("New input = " + searchOption);
  }

  let dictionaryName = ui.chooseDictionary(dictionaries, str);
  if (!dictionaryActive && dictionaryName) {
    let dictionary = loader.loadFile(dictionaryName);
    dict.displayStats(dictionary);
    dictionaryActive = true;
    ui.displaySearchOptions();
  } else if (!dictionaryActive) {
  	console.log('Please choose a valid dictionary')
  	ui.displayDictionaries(dictionaries);
  }


});
