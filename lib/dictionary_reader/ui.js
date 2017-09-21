var prompts = require('./prompts');
var Search = require('./searcher');
const {saver, writeData} = require('./saver');

var UserInterface = {
  one: function() {
    showMessage(prompts.welcome);
  },
  two: function(dictCount, callback) {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    var onData = (data) => {
      data = data.trim();

      if (data === 'q') {
        console.log('Shutting down');
        process.exit();
      } else if (parseInt(data) > 0 && parseInt(data) <= dictCount) {
        process.stdin.pause();
        process.stdin.removeListener('data', onData);
        callback(parseInt(data));
      } else {
        showMessage(prompts.invalidSelection);
      }
    };
    process.stdin.on('data', onData);
  },
  three: function(dict) {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    showMessage(prompts.search);
    showMessage(prompts.searchOptions);

    var onData = (data) => {
      data = data.trim();

      if (data === 'q') {
        console.log('Shutting down');
        process.exit();
      } else if (parseInt(data) > 0 && parseInt(data) < 5) {
        process.stdin.pause();
        process.stdin.removeListener('data', onData);
        this.four(dict, parseInt(data));
      } else {
        showMessage(prompts.invalidSelection);
      }
    };
    process.stdin.on('data', onData);
  },
  four: function(dict, choice) {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    showMessage(prompts.searchTerm);

    var onData = (data) => {
      data = data.trim();
      var query = data;
      var search = new Search(dict);

      if (choice === 1) {
        search.exact(query);
      } else if (choice === 2) {
        search.partial(query);
      } else if (choice === 3) {
        search.beginsWith(query);
      } else if (choice === 4) {
        search.endsWith(query);
      } else {
        showMessage(prompts.invalidSelection);
      }
      var matches = search.matches;
      process.stdin.pause();
      process.stdin.removeListener('data', onData);
      this.five(dict, matches);
    };
    process.stdin.on('data', onData);
  },
  five: function(dict, matches) {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    showMessage(prompts.saveResults);

    var onData = (data) => {
      data = data.trim();

      if (data === 'q' || data === 'n') {
        console.log('Shutting down');
        process.exit();
      } else if (data === 'y') {
        process.stdin.pause();
        process.stdin.removeListener('data', onData);
        this.six(matches);
      } else {
        showMessage(`Invalid: ${data}`);
      }
    };
    process.stdin.on('data', onData);
  },
  six: function(matches) {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    showMessage(prompts.savePath);

    var onData = (data) => {
      data = data.trim();
      var path = `./${data}`;

      saver(path, matches, function(message) {
        if (message === 'NA') {
          var writeMessage = '\nFile successfully written!';
          writeData(path, matches, writeMessage);
          process.stdin.pause();
          process.stdin.removeListener('data', onData);
        } else {
          showMessage(message);
        }
      });
      process.stdin.pause();
      process.stdin.removeListener('data', onData);
      this.seven(path, matches);
    }
    process.stdin.on('data', onData);
  },
  seven: function(path, matches) {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    var onData = (data) => {
      data = data.trim();

      if (data === 'q') {
        console.log('Shutting down');
        process.exit();
      } else if (data === 'n') {
        process.stdin.pause();
        process.stdin.removeListener('data', onData);
        this.six(matches);
      } else if (data === 'y') {
        var writeMessage = '\nFile successfully overwritten!';
        process.stdin.pause();
        process.stdin.removeListener('data', onData);
        writeData(path, matches, writeMessage);
      } else {
        showMessage(`Invalid: ${data}`);
      }
    }
    process.stdin.on('data', onData);
  }
};

function showMessage(err) {
  if (err) {
    console.error(err);
  }
};

module.exports = UserInterface;
