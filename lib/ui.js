const ui = {};

ui.welcome = function() {
	console.log("Welcome to the Node Dictionary Reader!");
	console.log("======================================");
	console.log("Enter q to quit");
}

ui.chooseDictionary = function(dictionaries){
  displayDictionaries(dictionaries);
  getUserInput(function(str) {
    if (validateDictChoice) {
      console.log('Dictionary chosen: ' + str)
    } else {}
      getUserInput
    }
    
  });
  
}

function validateDictChoice(dictionaries) {
  if (parseInt(str) >= 1 && parseInt(str) <= dictionaries.length) {
      return true
    } else {
      console.log('Wrong input! Choose an existing dictionary. ')
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
  })
}

module.exports = ui;