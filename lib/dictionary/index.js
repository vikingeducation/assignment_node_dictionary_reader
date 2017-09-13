var Ui = require('./cliui');
var dictionary_reader = require('./dictionary_reader');
var loader = require('./loader');
var saving = require('./saving');
var searching = require('./searcher');

const Index = {

  init: function() {
    Ui.beginLitening()
  }

}

module.exports = Index;
