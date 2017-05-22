var messages = require('./messages');
var loader = require('./loader');

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

    var onData = (data) => {
      data = data.trim();
      if (data === 'q') {
        //quit process
        process.stdin.pause();
        process.stdin.removeListener('data', onData);
      } else if (data === 'files') {
        //select
        loader.readFiles('./data')
      } else {
        //give error
        showMessage(`Invalid: ${ data }`);
      }
    };

    process.stdin.on('data', onData);
  }
}

module.exports = dictionary;
