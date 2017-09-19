var prompts = require('./prompts');

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
    console.log('');
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    var showMessage = (err) => {
      if (err) {
        console.error(err);
      }
    };

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
  }
};

module.exports = UserInterface;
