const menu = require('./menu');
const selectDict = require('./selectDict');
const search = require('./search');

function init() {
  console.log('Welcome to the Node Dictionary Reader:');
  console.log('======================================');
  selectDict(search);
}

module.exports = init;
