let loader = require('./loading');
let searcher = require('./searching');

process.stdin.resume();
process.stdin.setEncoding("utf8");
let dictionaryChoice;


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

  let onData = (data) => {
    data = data.trim();

    if (keys.indexOf(data) > -1) {
      let dict = dictionaries[data];
      dictionaryChoice = dict;

      loader.parseFile(dict, true);

      process.stdin.removeListener('data', onData);
    }
  }

 process.stdin.on('data', onData);
}

function selectSearchType() {
  let chosenOption;
  let searchOptions = {
    1: 'Exact',
    2: 'Partial',
    3: 'Begins With',
    4: 'Ends With'
  }

    let onSearchOptionsInput = (data) => {
      data = data.trim();

      if (chosenOption === '1'){
        let dictionary = loader.parseFile(dictionaryChoice, false).then((dictionary)=> {
          searcher.exactMatch(data, dictionary);
        })

      } else if (chosenOption === '2') {
      	let dictionary = loader.parseFile(dictionaryChoice, false).then((dictionary)=> {
          searcher.partialMatch(data, dictionary);
        })

      } else if (chosenOption === '3') {
      	let dictionary = loader.parseFile(dictionaryChoice, false).then((dictionary)=> {
          searcher.startsWithMatch(data, dictionary);
        })

      } else if (chosenOption === '4') {
      	let dictionary = loader.parseFile(dictionaryChoice, false).then((dictionary)=> {
          searcher.endsWithMatch(data, dictionary);
        })
      }

    }

    let onChosenData = (data) => {
    	data = data.trim();

    	if (data === '1') {
        chosenOption = data
        console.log('enter a search term');
        process.stdin.removeListener('data', onChosenData);
        process.stdin.on('data', onSearchOptionsInput);

    	} else if (data === '2') {
   			chosenOption = data;
    		console.log('enter a search term');
        process.stdin.removeListener('data', onChosenData);
        process.stdin.on('data', onSearchOptionsInput);

    	} else if (data === '3') {
    		chosenOption = data;
    		console.log('enter a search term');
        process.stdin.removeListener('data', onChosenData);
        process.stdin.on('data', onSearchOptionsInput);

    	} else if (data === '4') {
    		chosenOption = data;
    		console.log('enter a search term');
        process.stdin.removeListener('data', onChosenData);
        process.stdin.on('data', onSearchOptionsInput);
    	}
    }

    let onSelectData = (data) => {
    	data = data.trim();
      if (data === 'search') {
        console.log('What kind of search?');
        for (let option in searchOptions) {
          console.log(`${option}: ${searchOptions[option]}`);
        }
        process.stdin.removeListener('data', onSelectData);
        process.stdin.on('data', onChosenData);
      }
    }

    process.stdin.on('data', onSelectData);
  }

  function quit() {
    let userIn = "";

    process.stdin.on("data", (data) => {
      data = data.trim();

      if (data === "q" || data === 'quit') {
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
