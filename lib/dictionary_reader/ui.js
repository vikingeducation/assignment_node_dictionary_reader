const prompts = require('./prompts');
const loader = require('./loader');
const Search = require('./searcher');

const init = () => {
  let dictionary;
  let searchType;
  let searchTerm;
  let searchResults;
  let savePath;

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

    saver(savePath, searchResults, (callback) => {
      if (callback === )
    });
  }
  welcome();
};

module.exports = { init };
// var prompts = require('./prompts');
// var Search = require('./searcher');
// const {saver, writeData} = require('./saver');
//
// var UserInterface = {
//   one: function() {
//     showMessage(prompts.welcome);
//   },
//   two: function(dictCount, callback) {
//     process.stdin.resume();
//     process.stdin.setEncoding('utf8');
//
//     var onData = (data) => {
//       data = data.trim();
//
//       if (data === 'q') {
//         console.log('Shutting down');
//         process.exit();
//       } else if (parseInt(data) > 0 && parseInt(data) <= dictCount) {
//         process.stdin.pause();
//         process.stdin.removeListener('data', onData);
//         callback(parseInt(data));
//       } else {
//         showMessage(prompts.invalidSelection);
//       }
//     };
//     process.stdin.on('data', onData);
//   },
//   three: function(dict) {
//     process.stdin.resume();
//     process.stdin.setEncoding('utf8');
//
//     showMessage(prompts.search);
//     showMessage(prompts.searchOptions);
//
//     var onData = (data) => {
//       data = data.trim();
//
//       if (data === 'q') {
//         console.log('Shutting down');
//         process.exit();
//       } else if (parseInt(data) > 0 && parseInt(data) < 5) {
//         process.stdin.pause();
//         process.stdin.removeListener('data', onData);
//         this.four(dict, parseInt(data));
//       } else {
//         showMessage(prompts.invalidSelection);
//       }
//     };
//     process.stdin.on('data', onData);
//   },
//   four: function(dict, choice) {
//     process.stdin.resume();
//     process.stdin.setEncoding('utf8');
//
//     showMessage(prompts.searchTerm);
//
//     var onData = (data) => {
//       data = data.trim();
//       var query = data;
      // var search = new Search(dict);
      //
      // if (choice === 1) {
      //   search.exact(query);
      // } else if (choice === 2) {
      //   search.partial(query);
      // } else if (choice === 3) {
      //   search.beginsWith(query);
      // } else if (choice === 4) {
      //   search.endsWith(query);
      // } else {
      //   showMessage(prompts.invalidSelection);
      // }
      // var matches = search.matches;
//       process.stdin.pause();
//       process.stdin.removeListener('data', onData);
//       this.five(dict, matches);
//     };
//     process.stdin.on('data', onData);
//   },
//   five: function(dict, matches) {
//     process.stdin.resume();
//     process.stdin.setEncoding('utf8');
//
//     showMessage(prompts.saveResults);
//
//     var onData = (data) => {
//       data = data.trim();
//
//       if (data === 'q' || data === 'n') {
//         console.log('Shutting down');
//         process.exit();
//       } else if (data === 'y') {
//         process.stdin.pause();
//         process.stdin.removeListener('data', onData);
//         this.six(matches);
//       } else {
//         showMessage(`Invalid: ${data}`);
//       }
//     };
//     process.stdin.on('data', onData);
//   },
//   six: function(matches) {
//     process.stdin.resume();
//     process.stdin.setEncoding('utf8');
//
//     showMessage(prompts.savePath);
//
//     var onData = (data) => {
//       data = data.trim();
//       var path = `./${data}`;
//
//       saver(path, matches, function(message) {
//         if (message === 'NA') {
//           var writeMessage = '\nFile successfully written!';
//           writeData(path, matches, writeMessage);
//           process.stdin.pause();
//           process.stdin.removeListener('data', onData);
//         } else {
//           showMessage(message);
//         }
//       });
//       process.stdin.pause();
//       process.stdin.removeListener('data', onData);
//       this.seven(path, matches);
//     }
//     process.stdin.on('data', onData);
//   },
//   seven: function(path, matches) {
//     process.stdin.resume();
//     process.stdin.setEncoding('utf8');
//
//     var onData = (data) => {
//       data = data.trim();
//
//       if (data === 'q') {
//         console.log('Shutting down');
//         process.exit();
//       } else if (data === 'n') {
//         process.stdin.pause();
//         process.stdin.removeListener('data', onData);
//         this.six(matches);
//       } else if (data === 'y') {
//         var writeMessage = '\nFile successfully overwritten!';
//         process.stdin.pause();
//         process.stdin.removeListener('data', onData);
//         writeData(path, matches, writeMessage);
//       } else {
//         showMessage(`Invalid: ${data}`);
//       }
//     }
//     process.stdin.on('data', onData);
//   }
// };
//
// function showMessage(err) {
//   if (err) {
//     console.error(err);
//   }
// };
//
// module.exports = UserInterface;
