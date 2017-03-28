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





module.exports = ui;