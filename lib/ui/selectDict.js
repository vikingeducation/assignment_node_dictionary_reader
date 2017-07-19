const menu = require('./menu');
const load = require('../loader');
const dictionaries = { 1: './data/dictionary.json' };

// Prompt the user to select a dictionary
function init(callback) {
  menu('Select a dictionary to load:', dictionaries, selection => {
    load(dictionaries[selection], callback);
  });
}

module.exports = init;
