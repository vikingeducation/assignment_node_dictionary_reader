var fs = require('fs')

var data;

var loadDict = {
  
	loader: function(filename){
	  var path = `./data/${filename}`;
	  data = JSON.parse(fs.readFileSync(path, 'utf-8'))
  },

  getData: function() {
    return data
  },

  wordCount: function() {
    return Object.keys(data).length
  }



};




module.exports = loadDict;


//const loadDictionary = function(filename) {
// 	new LoadedDictionary(loader(filename));
// }

// class LoadedDictionary {
// 	constructor(dictionary) {
// 		this.dictionary = dictionary;
// 	}
// }