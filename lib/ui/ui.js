const menu = require('./menu');
const loader = require('../loader');

const dictionaries = { 1: 'dictionary.json' };

function init() {
  menu('Select a dictionary to load:', dictionaries, load);
}

function load(selection) {
  loader(dictionaries[selection], recieveDict);
}

function recieveDict(err, result) {}

module.exports = init;
