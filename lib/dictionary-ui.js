var messages = require('./messages')

var dictionary = {
  init: function() {
    var showMessage = (err, message) => {
      console.log(message);
      if (err) {
        console.error(err);
      }
    };

    showMessage(null, messages.welcome);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    var showMessage = (err, message) => {
      console.log(message);
      if (err) {
        console.error(err);
      }
    };

    var onData = (data) => {
      data = data.trim();
      if (data === 'q') {
        process.stdin.pause();
        process.stdin.removeListener('data', onData);
      } else {
        showMessage(`Invalid: ${ data }`);
      }
    };

    process.stdin.on('data', onData);
  }
}

module.exports = dictionary;
