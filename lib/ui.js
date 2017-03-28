function welcome(){
	console.log("Welcome to the Node Dictionary Reader!");
	console.log("======================================");
	console.log("Enter q to quit");
}

function chooseDictionary(dictionaries){

}

function displayDictionaries(dictionaries){
	console.log('Select a dictionary to load:');
	for (var i = 0; i < dictionaries.length; i++) {
		console.log(`${i + 1}. ${dictionaries[i]}`);
	}
}