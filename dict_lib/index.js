var UI = require('./UI.js');
var loader = require('./loader.js');
var saving = require('./saving.js');
var dictData = require('./dictData.js');
var searching = require('./searching.js');

var Main = {
	init: function(){
		UI.test();
		loader.test()
		saving.test();
		dictData.test();
		searching.test();
	}
}

module.exports = Main;
