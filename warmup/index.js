var two = require('./two')

function one() {

  //listen to STDIN
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  //handle message output
  var showMessage = (err) => {
    console.log('State one');
    console.log('Type "next" to continue');
    if (err) {
      console.error(err)
    }
  };

  showMessage();

  //handle STDIN data
  var onData = (data) => {
    data = data.trim();

    //if user input next
    //go to next State
    if (data == 'next') {
      //process.stdin.pause();
      //process.stdin.removeListener('data', onData);

      //go to next view here
      two()

    } else {
      showMessage(`Invalid: ${ data }`);
    }
  };

  //listener
  process.stdin.on('data', onData)

}

//start the app
one();
