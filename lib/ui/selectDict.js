const menu = require('./menu');
const load = require('../loader');
const dictionaries = { 1: './data/dictionary.json' };

// Prompt the user to select a dictionary
function init(callback) {
  let options = dictionaries;
  options['q'] = 'Quit';
  menu('Select a dictionary to load:', options, selection => {
    if (selection === 'q') {
      process.exit();
    }
    load(dictionaries[selection], callback);
  });
}

module.exports = init;
