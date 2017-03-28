const ui = require('./lib/ui');
const loader = require('./lib/loader');
const dictionary = require('./lib/dictionary');


ui.welcome();
const dictionaries = loader.findDictionaries();
ui.chooseDictionary(dictionaries, loader.loadFile);

