const config = require('./config');
const load = require('./load');
const search = require('./search');
const save = require('./save');
const game = require('./definition_game');

const init = () => {
  let runSearch;
  let dictionary;
  let results;
  let savedResultsPath;
  let gameChoices;
  let score = 0;
  let attempts = 3;

  // uses config.json to display user prompts and messages
  const displayMsg = (messages) => {
    for (var msg in messages) {
      console.log(messages[msg]);
    }
  };

  // wrapper for adding listeners to command lien
  const resumeInput = (listener) => {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', listener);
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

  // first function which welcomes user and displays dictionaries to load
  const welcome = () => {
    displayMsg(config.welcome);
    load.listDictionaries();
    resumeInput(selectDictionary);
  };

  const selectDictionary = (input) => {
    input = input.trim();

    if (input === 'q') {
      exitProgram();

      // Opens dictionary and displays word count + word frequency
    } else if (load.isDictionary(input)) {
      dictionary = load.openDictionary(input);

      pauseInput(selectDictionary);
      displayMsg(config.search);
      resumeInput(chooseSearchMethod);
    } else {
      warning(input);
    }
  };
  
  const chooseSearchMethod = (input) => {
    input = input.trim().toLowerCase();
    if (input === 'q') {
      exitProgram();

      // saves a search method to variable available to rest of program
    } else if (input === 'game') {
      pauseInput(chooseSearchMethod);
      displayMsg(config.definitionGameStart);
      definitionGame();
    } else if (search.methods[input]) {
      runSearch = search.methods[input];
      pauseInput(chooseSearchMethod);
      displayMsg(config.enterSearchTerm);
      resumeInput(enterSearchTerm);
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
      pauseInput(enterSearchTerm);

      if (results[0].length > 0) {
        console.log(`\nFound ${ results.length} results: `);
        results.forEach(result => console.log(`${ result }: ${ dictionary[result] }\n`));

        displayMsg(config.askToSave);
        resumeInput(askToSave);
      } else {
        console.log("Sorry, nothing could be found. Try your search again:");
        resumeInput(enterSearchTerm);
      }
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
      resumeInput(askForFilePath);
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
      resumeInput(confirmOverwrite);

      // if file does not exist, file is written immediately
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

  const definitionGame = () => {
    let definition = game.getDefinition(dictionary);
    console.log(definition);
    displayMsg(config.definitionGameMain);
    gameChoices = game.getChoices(dictionary);
    gameChoices.forEach((word, index) => {
      console.log(`${ index + 1 }. ${ word}`);
    });
    resumeInput(enterGameAnswer);
  };

  const enterGameAnswer = (input) => {
    input = input.trim();
    if (input === 'q') {
      exitProgram();
    } else {
      let result = game.validateInput(input);

      result ? continueGame("success") : continueGame("failure");
    }
  };

  const continueGame = (status) => {
    pauseInput(enterGameAnswer);
    if (status === "success") {
      console.log(config.definitionGameResult.success);
      score += game.getScore();
      console.log(`Your score is now: ${ score }`);
      nextRound();
    } else if (status === "failure") {
      console.log(config.definitionGameResult.failure);
      attempts--;
      console.log(`You have ${ attempts } attempts left...`);
      if (isGameOver()) {
        endGame();
      } else {
        nextRound();
      }
    }
  };

  const isGameOver = () => {
    return attempts < 1;
  };

  const nextRound = () => {
    displayMsg(config.nextRound);
    let definition = game.getDefinition(dictionary);
    console.log(definition);
    displayMsg(config.definitionGameMain);
    gameChoices = game.getChoices(dictionary);
    gameChoices.forEach((word, index) => {
      console.log(`${ index + 1 }. ${ word}`);
    });
    resumeInput(enterGameAnswer);
  };

  const endGame = () => {
    displayMsg(config.gameOver);
    console.log(`Your score was ${ score }. Good Job!`);
  };

  welcome();
};


module.exports = {
  init: init
};