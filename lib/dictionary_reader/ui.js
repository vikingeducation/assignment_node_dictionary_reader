var prompts = require('./prompts');
var Search = require('./searcher');

var UserInterface = {
  one: function() {
    console.log(prompts.welcome);

    var showMessage = (err) => {
      if (err) {
        console.error(err);
      }
    };
    showMessage();
  },
  two: function(dictCount, callback) {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    var showMessage = (err) => {
      console.log('');
      if (err) {
        console.error(err);
      }
    };
    showMessage();

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
        showMessage(prompts.invalid_selection);
      }
    };
    process.stdin.on('data', onData);
  },
  three: function(dict) {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    var showMessage = (err) => {
      console.log('');
      console.log(prompts.search);
      console.log(prompts.search_options);
      if (err) {
        console.error(err);
      }
    };
    showMessage();

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
        showMessage(prompts.invalid_selection);
      }
    };
    process.stdin.on('data', onData);
  },
  four: function(dict, choice) {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    var showMessage = (err) => {
      console.log('');
      console.log(prompts.search_term);
      if (err) {
        console.error(err);
      }
    };
    showMessage();

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
      }
    };
    process.stdin.on('data', onData);
  }
};

module.exports = UserInterface;
