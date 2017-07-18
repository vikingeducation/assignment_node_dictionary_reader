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

function selectDict(index) {
	let userIn = "";

	process.stdin.on("data", (data) => {
		data = data.trim();

		if (data === "1") {
			console.log('hit!');
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
  displayDictionaries: displayDictionaries
}
