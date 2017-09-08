
function three() {

  //listen to STDIN
  process.stdin.resume();
  process.stdin.setEncoding('utf8');


  var showMessage = (err) => {
    console.log('State three');
    console.log('Type "next" to end');
    if (err) {
      console.error(err)
    }
  };

  showMessage();

  var onData = (data) => {
    data = data.trim();

    //if user input next
    //go to next State
    if (data == 'next') {
      process.stdin.pause();
      process.stdin.removeListener('data', onData);

    } else {
      showMessage(`Invalid: ${ data }`);
    }
  };

  //listener
  process.stdin.on('data', onData)

}

module.exports = three;
