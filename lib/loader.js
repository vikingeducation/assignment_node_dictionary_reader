const fs = require('fs');

function findDictionaries(){
	return fs.readdirSync('../data/');
}