const ui = {};

ui.welcome = function() {
	console.log("Welcome to the Node Dictionary Reader!");
	console.log("======================================");
	console.log("Enter q to quit");
}

ui.chooseDictionary = function(dictionaries, callback){
  displayDictionaries(dictionaries);
  getUserInput(function(input){
    input = parseInt(input) - 1;
    
    if (input < 0 || input >= dictionaries.length) {
      console.log('not a valid dictionary. Goodbye! ')
      process.exit();
    }
    console.log('input ' + input);
    callback(dictionaries[input]);
  });
}

function displayDictionaries(dictionaries){
	console.log('Select a dictionary to load:');
	for (var i = 0; i < dictionaries.length; i++) {
		console.log(`${i + 1}. ${dictionaries[i]}`);
	}
}

function getUserInput(callback) {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (str) => {
    str = str.trim();

    if (str === 'q' || str === 'quit') {
      console.log('Goodbye.');
      process.exit();
    }
    
    process.stdin.pause();
    callback(str);
    
  });
}



module.exports = ui;