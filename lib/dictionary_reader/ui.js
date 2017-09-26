const prompts = require('./prompts');
const loader = require('./loader');
const Search = require('./searcher');
const { saver, writeData } = require('./saver');

const init = () => {
  let dictionary;
  let searchType;
  let searchTerm;
  let searchResults;
  let savePath;
  let writeMessage;

  const showMessage = (err) => {
    if (err) {
      console.error(err);
    }
  };

  const resumeInput = (listener) => {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', listener);
  };

  const pauseInput = (listener) => {
    process.stdin.pause();
    process.stdin.removeListener('data', listener);
  };

  const shutdown = () => {
    console.log('Shutting down');
    process.exit();
  };

  const welcome = () => {
    console.log(prompts.welcome);
    loader.listDicts();
    resumeInput(selectDict);
  };

  const selectDict = (data) => {
    data = data.trim();

    if (data === 'q') {
      shutdown();
    } else if (loader.checkChoice(data)) {
      dictionary = loader.loadDict(data);

      pauseInput(selectDict);
      console.log(prompts.search);
      console.log(prompts.searchOptions);
      resumeInput(selectSearch);
    } else {
      showMessage(prompts.invalidSelection);
    }
  };

  const selectSearch = (data) => {
    data = data.trim();

    if (data === 'q') {
      shutdown();
    } else if (parseInt(data) > 0 && parseInt(data) < 5) {
      searchType = parseInt(data);

      pauseInput(selectSearch);
      console.log(prompts.searchTerm);
      resumeInput(inputSearchTerm);
    } else {
      showMessage(prompts.invalidSelection);
    }
  };

  const inputSearchTerm = (data) => {
    searchTerm = data.trim().toLowerCase();
    pauseInput(inputSearchTerm);
    const search = new Search(dictionary);

    if (searchType === 1) {
      search.exact(searchTerm);
    } else if (searchType === 2) {
      search.partial(searchTerm);
    } else if (searchType === 3) {
      search.beginsWith(searchTerm);
    } else if (searchType === 4) {
      search.endsWith(searchTerm);
    }
    searchResults = search.matches;
    console.log(prompts.saveResults);
    resumeInput(saveResults);
  };

  const saveResults = (data) => {
    data = data.trim();

    if (data === 'q' || data === 'n') {
      shutdown();
    } else if (data === 'y') {
      pauseInput(saveResults);
      console.log(prompts.savePath);
      resumeInput(inputSavePath);
    } else {
      showMessage(`Invalid: ${data}`);
    }
  };

  const inputSavePath = (data) => {
    data = data.trim();
    savePath = `./${data}`;

    saver(savePath, searchResults, (fileExists) => {
      if (!fileExists) {
        pauseInput(inputSavePath);
        writeMessage = prompts.fileWritten;
        writeData(savePath, searchResults, writeMessage);
      } else {
        pauseInput(inputSavePath);
        console.log(prompts.overwriteFile);
        resumeInput(confirmOverwrite);
      }
    });
  };

  const confirmOverwrite = (data) => {
    data = data.trim();

    if (data === 'q') {
      shutdown();
    } else if (data === 'y') {
      pauseInput(confirmOverwrite);
      writeMessage = prompts.fileOverwritten;
      writeData(savePath, searchResults, writeMessage);
    } else if (data === 'n') {
      pauseInput(confirmOverwrite);
      console.log(prompts.savePath);
      resumeInput(inputSavePath);
    } else {
      showMessage(`Invalid: ${data}`);
    }
  };
  welcome();
};

module.exports = { init };
