var ui = require('./cli_ui');
var dictionary_stream = require('./dictionary_stream');
var loader = require('./loader');
//var saving = require('./saving');
//var searching = require('./searching');

const Index = {

  init: function() {
    ui.beginLitening()
  }

}

module.exports = Index;
