const config = require('./config');
const load = require('./load');
const search = require('./search');
const save = require('./save');
const game = require('./definition_game');

// This sequence clears consoles on Linux and Windows
// http://stackoverflow.com/a/26373971/7565120
const CLEAR = '\033c';

const init = () => {
  let runSearch;
  let dictionary;
  let results;
  let savedResultsPath;

  /*
    -- Helper functions
  */
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

  /*
   -- Main Program Flow
  */
  // first function which welcomes user and displays dictionaries to load
  const welcome = (msg) => {
    msg = msg || "";
    console.log(msg);
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
      console.log(CLEAR);
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
      pauseInput(askForFilePath);
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
    let gameChoices = game.getChoices(dictionary);
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
      // returns a boolean
      let isAnswerCorrect = game.checkAnswer(input);
      continueGame(isAnswerCorrect);
    }
  };

  const continueGame = (isAnswerCorrect) => {
    pauseInput(enterGameAnswer);
    console.log(CLEAR);
    game.updateScore(isAnswerCorrect);
    let score = game.getScore();
    let attempts = game.getAttempts();
    let msg = game.getResponse(isAnswerCorrect);

    console.log(msg);
    console.log(`Your score is now: ${ score }.`);
    console.log(`You have ${ attempts } attempts left...`);
    if (isGameOver()) {
        endGame();
      } else {
        nextRound();
    }
  };

  const isGameOver = () => {
    let attempts = game.getAttempts();
    return attempts < 1;
  };

  const nextRound = () => {
    displayMsg(config.nextRound);
    let definition = game.getDefinition(dictionary);
    console.log(definition);
    displayMsg(config.definitionGameMain);
    let gameChoices = game.getChoices(dictionary);
    gameChoices.forEach((word, index) => {
      console.log(`${ index + 1 }. ${ word}`);
    });
    resumeInput(enterGameAnswer);
  };

  const endGame = () => {
    displayMsg(config.gameOver);
    welcome();
  };

  welcome(CLEAR);
};


module.exports = {
  init: init
};