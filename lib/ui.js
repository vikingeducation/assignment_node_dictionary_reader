const ui = {};

ui.welcome = function() {
	console.log("Welcome to the Node Dictionary Reader!");
	console.log("======================================");
	console.log("Enter q to quit");
}

ui.chooseDictionary = function(dictionaries, input){
  input = parseInt(input) - 1;
  
  if (!isNaN(input) && input >= 0 && input < dictionaries.length) {
    return dictionaries[input]
  }
}



ui.displayDictionaries = function(dictionaries){
	console.log('Select a dictionary to load:');
	for (var i = 0; i < dictionaries.length; i++) {
		console.log(`${i + 1}. ${dictionaries[i]}`);
	}
}

ui.displaySearchOptions = function() {
  console.log("Please choose the search type: ");
  console.log("1. Exact match\n2. Partial matches\n3. 'Begins with' matches\n4. 'Ends with' matches")
}




module.exports = ui;