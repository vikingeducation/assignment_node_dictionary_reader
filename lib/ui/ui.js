const menu = require('./menu');
const loader = require('../loader');

const dictionaries = { 1: './data/dictionary' };

function init() {
  console.log(process.argv.slice(1, 2));
  menu('Select a dictionary to load:', dictionaries, load);
}

function load(selection) {
  loader(dictionaries[selection], recieveDict);
}

function recieveDict(err, result) {
  console.log(result);
}

module.exports = init;
