var three = require('./state_three');

function two() {

  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  var showMessage = (err) => {
    console.log('State two');
    console.log('Type "next" to continue');
    if (err) {
      console.error(err);
    }
  };

  showMessage();

  var onData = (data) => {
    data = data.trim();

    if (data === 'next') {
      process.stdin.pause();
      process.stdin.removeListener('data', onData);
      three();
    } else {
      showMessage(`Invalid: ${ data }`);
    }
  };

  process.stdin.on('data', onData);
}

module.exports = two;
