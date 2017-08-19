var fs = require('fs');
var loading = require('./loading');

var cliUI = function () {
  console.log('\033c');
  console.log("Welcome to the Node Dictionary Reader!\n======================================\nEnter q to quit");
  loading();

}

module.exports = cliUI;
