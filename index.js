var cliInterface = require('./modules/cli_interface');
var dictionaryData = require('./modules/dictionary_data');
var loader = require('./modules/loader');
var saver = require('./modules/saver');
var searcher = require('./modules/searcher');

// Start the app
cliInterface();
dictionaryData();
loader();
searcher();
saver();
