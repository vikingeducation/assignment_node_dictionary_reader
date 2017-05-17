const config = require('./config');
const load = require('./load');
const search = require('./search');
const save = require('./save');

const init = () => {
  let runSearch;
  let dictionary;
  let results;
  let savedResultsPath;

  const displayMsg = (messages) => {
    for (var msg in messages) {
      console.log(messages[msg]);
    }
    
  };

  const enableInput = (fn) => {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', fn);
  };

  const exitProgram = () => {
    console.log('Goodbye!');
    process.exit();
  };

  const warning = (input) => {
    console.log(`Sorry, the command '${ input }' was not recognized. Please try again.`);
  };

  const pauseInput = (listener) => {
    process.stdin.pause();
    process.stdin.removeListener('data', listener);
  };

  const welcome = () => {
    displayMsg(config.welcome);
    load.listDictionaries();
    enableInput(selectDictionary);
  };

  const selectDictionary = (input) => {
    input = input.trim();

    if (input === 'q') {
      exitProgram();
    } else if (load.isDictionary(input)) {
      dictionary = load.openDictionary(input);

      pauseInput(selectDictionary);
      displayMsg(config.search);
      enableInput(chooseSearchMethod);
    } else {
      warning(input);
    }
  };
  
  const chooseSearchMethod = (input) => {
    input = input.trim();
    if (input === 'q') {
      exitProgram();
    } else if (search.methods[input]) {
      runSearch = search.methods[input];
      pauseInput(chooseSearchMethod);
      displayMsg(config.enterSearchTerm);
      enableInput(enterSearchTerm);
    } else {
      warning(input);
    }
  };

  const enterSearchTerm = (input) => {
    input = input.trim().toLowerCase();
    if (input === 'q') {
      exitProgram();
    } else if (search.isValid(input)) {

      // always returns array
      results = runSearch(input, dictionary);
      console.log(`\nFound ${ results.length} results: `);
      results.forEach(result => console.log(`${ result }: ${ dictionary[result] }\n`));

      pauseInput(enterSearchTerm);
      displayMsg(config.askToSave);
      enableInput(askToSave);
    } else {
      warning(input);
    }
  };

  const askToSave = (input) => {
    input = input.trim().toLowerCase();
    if (input === 'q' || input === 'n') {
      exitProgram();
    } else if (input === 'y') {
      pauseInput(askToSave);
      displayMsg(config.askForFilePath);
      enableInput(askForFilePath);
    } else {
      warning(input);
    }
  };

  const askForFilePath = (input) => {
    input = input.trim().toLowerCase();
    savedResultsPath = `./${ input }`;
    if (input === 'q') {
      exitProgram();
    } else if (save.ifFileExists(savedResultsPath)) {
      pauseInput(askForFilePath);
      displayMsg(config.overwrite);
      enableInput(confirmOverwrite);
    } else if (!save.ifFileExists(savedResultsPath)) {
      save.writeFile(savedResultsPath, results, dictionary);
      pauseInput(confirmOverwrite);
      displayMsg(config.writeFile);
      welcome();
    } else {
      warning(input);
    }
  };

  const confirmOverwrite = (input) => {
    input = input.trim().toLowerCase();
    if (input === 'q') {
      exitProgram();
    } else if (input === 'n') {
      pauseInput(confirmOverwrite);
      welcome();
    } else if (input === 'y') {
      save.writeFile(savedResultsPath, results, dictionary);
      pauseInput(confirmOverwrite);
      displayMsg(config.writeFile);
      welcome();
    } else {
      warning(input);
    }
  };

  welcome();
};

module.exports = {
  init: init
};