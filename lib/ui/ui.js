const menu = require('./menu');
const loader = require('../loader');

const dictionaries = { 1: './data/dictionary.json' };

function init() {
  menu('Select a dictionary to load:', dictionaries, load);
}

function load(selection) {
  loader(dictionaries[selection], recieveDict);
}

function recieveDict(err, result) {
  console.log(`Loading was a success!`);
  console.log(`Words: ${result.length}`);
}

module.exports = init;
