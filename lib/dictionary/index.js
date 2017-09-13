var ui = require('./cli_ui');
var dictionary_reader = require('./dictionary_reader');
var loader = require('./loader');
var saving = require('./saving');
var searching = require('./searcher');

const Index = {

  init: function() {
    ui.beginLitening()
  }

}

module.exports = Index;
