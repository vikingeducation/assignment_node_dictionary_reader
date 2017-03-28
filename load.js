var fs = require('fs')

var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',];

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
    console.log(Object.keys(data).length);
  },

  letterCount: function() {
  	console.log("Word frequency by starting letter");
  	for( var i = 0; i < alphabet.length; i++ ) {
  		let counter = 0;
  		for (key in data) {
  			if (key[0] === alphabet[i]) {
  				counter++;
  			}
  		}
  		console.log(`${alphabet[i]}: ${counter}`);
  	}
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