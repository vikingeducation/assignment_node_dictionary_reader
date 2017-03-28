const ui = require('./lib/ui');
const loader = require('./lib/loader');



ui.welcome();
const dictionaries = loader.findDictionaries();
ui.chooseDictionary(dictionaries);
// dict.loadFile
