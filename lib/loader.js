const fs = require('fs');
const loader = {};
const path = './data';

loader.findDictionaries = function(){
	return fs.readdirSync(path);
}

loader.loadFile = function(fileName) {
  let dataInDict = fs.readFileSync(`${path}/${fileName}`, 'utf-8');
  return JSON.parse(dataInDict);
}

module.exports = loader;

