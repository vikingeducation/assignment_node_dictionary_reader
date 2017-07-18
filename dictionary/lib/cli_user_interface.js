let loader = require('./loading');

process.stdin.resume();
process.stdin.setEncoding("utf8");

function introMessage(err) {
  console.log('Welcome to the Node Dictionary Reader!');
  console.log('======================================');
  console.log('Enter q to quit');

  console.log(' ');
  console.log(' ');

  if (err) {
    console.error(err);
  }
};

function displayDictionaries(dictionaries) {
	for (index in dictionaries) {
		console.log(`${index}. ${dictionaries[index]}`);
	}
}

function selectDict(dictionaries) {
  let keys = Object.keys(dictionaries)
	let userIn = "";

	process.stdin.on("data", (data) => {
		data = data.trim();
		if (keys.indexOf(data) > -1) {
      let dict = dictionaries[data];
      loader.parseFile(dict)
      // searching(dictionaries)
		} else {
      console.log('not one of the options')
    }
	})
}

function quit() {
	let userIn = "";

	process.stdin.on("data", (data) => {
		data = data.trim();

		if (data === "q") {
      console.log('quitting');
			process.stdin.pause();
		}
	})
}


module.exports = {
	introMessage: introMessage,
  quit: quit,
  displayDictionaries: displayDictionaries,
  selectDict: selectDict
}
