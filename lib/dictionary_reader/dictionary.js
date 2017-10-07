

		//load the dictionary and process its stats (with your stat module(dictionaryfile))

		// display stats processed by your stat module to user, eg: 
		//      A success message is a nice touch too:
		//      Successfully loaded: dictionary.json
		//      Word count: 12345
		//      Word frequency by starting letter:
		//      A: 123
		//      B: 456	

const parseFile = (file) => {
	console.log('dictionary!!');
	console.log(file);
};

module.exports = {
	parse: parseFile
}
