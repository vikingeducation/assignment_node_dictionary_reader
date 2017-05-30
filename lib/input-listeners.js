var helpers = require('./helpers');
var loader = require('./loader');
var dictionary = require('./dictionary_ui');
var wrapper = require('./dictionary-wrapper');

var listeners = {

  chooseDictionaryListener: (data) => {
    data = data.trim();
    if (data === 'q') {
      process.stdin.pause();
      process.stdin.removeAllListeners('data');
    } else {
      //choose dictionary or return error if invalid input
      loader.loadDictionary(data).then( (result) => {
        process.stdin.pause();
        process.stdin.removeAllListeners();
        wrapper.loadDictionary(result);
      }).catch( (reject) => {
        console.error(reject);
      });
    }
  },

  searchDictionaryListener: (data) => {
    data = data.trim();
    if (data === 'q') {
      process.stdin.pause();
      process.stdin.removeAllListeners('data');
    }
  }
}

module.exports = listeners;
