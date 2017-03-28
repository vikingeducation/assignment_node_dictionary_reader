const fs = require('fs');
const loader = {};
const path = './data';
loader.findDictionaries = function(){
	 return fs.readdirSync(path);
  }


module.exports = loader;

