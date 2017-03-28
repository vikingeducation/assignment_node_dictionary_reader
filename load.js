var fs = require('fs')

var loadDict = {
	
	loader: function(filename){
	  var path = `./data/${filename}`;
	  fs.readFileSync(path, 'utf8', (err, data) => {
	    if (err) throw err;
	    return data 
	  }),
	  dictionary: 



}


module.exports = loadDict;


//const loadDictionary = function(filename) {
// 	new LoadedDictionary(loader(filename));
// }

// class LoadedDictionary {
// 	constructor(dictionary) {
// 		this.dictionary = dictionary;
// 	}
// }