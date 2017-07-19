const menu = require('./menu');
const dictionaries = { 1: './data/dictionary.json' };

// Prompt the user to select a dictionary
function init(callback) {
  menu('Select a dictionary to load:', dictionaries, (selection) => {
    callback(dictionaries[selection]);
  });
}


module.exports = init;
