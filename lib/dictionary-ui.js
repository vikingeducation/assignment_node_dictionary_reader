var messages = require('./messages');
var loader = require('./loader');
var helpers = require('./helpers');
var listeners = require('./input-listeners');
var state = require('./dictionary-states');

var dictionary = {
  init: function() {

    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', listeners.chooseDictionaryListener);

    helpers.showMessage(null, messages.welcome);
    loader.readFiles('./data');
  }
}

module.exports = dictionary;
