var listeners = require('./input-listeners');
var loader = require('./loader');
var Dictionary = require('./dictionary');
var Searcher = require('./dictionary-searcher');

var wrapper = {};

wrapper.loadDictionary = (dictionary) => {

  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  // process.stdin.on('data', listeners.searchDictionaryListener);

  process.stdin.on('data', (data) => {
    data = data.trim();
    if (data === 'q') {
      process.stdin.pause();
      process.stdin.removeAllListeners('data');
    }
  });

  loader.loadDictionaryFile(`./data/${dictionary}`).then( (result) => {
    var d = new Dictionary(dictionary, result);
    d.printStatistics();

    var s = new Searcher(d);
    s.searchForString('apple');


  }).catch( (reject) => {
    console.error(reject);
  });
}


module.exports = wrapper;
