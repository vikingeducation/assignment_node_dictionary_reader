function three() {

  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  var showMessage = (err) => {
    console.log('State three');
    console.log('Type "next" to continue');
    if (err) {
      console.error(err);
    }
  };

  showMessage();

  var onData = (data) => {
    data = data.trim();

    if (data === 'next' || data === 'q' || data === 'quit') {
      process.stdin.pause();
      process.stdin.removeListener('data', onData);
    } else {
      showMessage(`Invalid: ${ data }`);
    }
  };
  process.stdin.on('data', onData);
}

module.exports = three;
