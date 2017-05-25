var messages = require('./messages');
var loader = require('./loader');
var helpers = require('./helpers');
var listeners = require('./input-listeners');
var state = require('./dictionary-states');

var dictionary = {
  init: function() {
    // helpers.showMessage(null, messages.welcome);
    var running = true;

    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    while (running) {
      switch (state.currentState) {
        case state.possibleStates.INITIALIZING:
          helpers.showMessage(null, messages.welcome);
          state.advanceState();
          break;
        case state.possibleStates.LOADING_DICTIONARIES:
          console.log("ran");
          loader.readFiles('./data');
          running = false;
          break;
      }
    }

    process.stdin.on('data', listeners.quitListener);
  }
}

module.exports = dictionary;
