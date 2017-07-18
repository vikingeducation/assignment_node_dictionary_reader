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
      // process.stdin.pause();

		} else {
      console.log('not one of the options')
    }
	})
}

function selectSearchType() {
  process.stdin.resume();
  let searchOptions = {
    1: 'Exact',
    2: 'Partial',
    3: 'Begins With',
    4: 'Ends With'
  }
	process.stdin.on("data", (data) => {
		data = data.trim();
		if (data === 'search'){
      console.log('What kind of search?');
      for (let option in searchOptions){
        console.log(`${option}: ${searchOptions[option]}`);
      }
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
  selectDict: selectDict,
  selectSearchType: selectSearchType
}
