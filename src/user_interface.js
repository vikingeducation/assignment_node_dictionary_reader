const loader = require('./loader.js');

let init = function() {

  console.log('Welcome to the Node Dictionary Reader!');
  console.log('======================================');
  console.log('Enter q to quit\n\n');

  //load dictionary files
  loader.loadFiles();
};

module.exports = {
  init: init
};