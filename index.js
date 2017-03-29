const ui = require('./lib/ui');
const loader = require('./lib/loader');
const dict = require('./lib/dict');
const searcher = require('./lib/searcher');

let dictionaryActive = false;
let dictionary;
let searchOption;
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

  if (searchOption) {
    let searchTerm = str;
    if (!(searchTerm == '-back')) {
      switch (searchOption) {
        case 1:
        searcher.exactMatch(dictionary, searchTerm);
        break;
        case 2:
        searcher.partialMatch(dictionary, searchTerm);
        break;
        case 3:
        searcher.beginsWithMatch(dictionary, searchTerm);
        break;
        case 4:
        searcher.endsWithMatch(dictionary, searchTerm);
        break;
        default:
      }
      console.log("Enter new search statement ('-back' for different search type)");
    } else {
      searchOption = false;
    }
    
  }

  if (dictionaryActive && !searchOption) {
    str = parseInt(str);
    if (!isNaN(str) && str < 5 && str > 0) {
      searchOption = str;
      console.log("Type your search term: ")
    } else if (!(str == '-back')) {
      console.log("Please choose the valid search type. ");
      ui.displaySearchOptions();
    }
  }

  let dictionaryName = ui.chooseDictionary(dictionaries, str);
  if (!dictionaryActive && dictionaryName) {
    dictionary = loader.loadFile(dictionaryName);
    dict.displayStats(dictionary);
    dictionaryActive = true;
    ui.displaySearchOptions();
  } else if (!dictionaryActive) {
  	console.log('Please choose a valid dictionary')
  	ui.displayDictionaries(dictionaries);
  }


});
