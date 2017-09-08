var three = require('./three')

function two() {


  //listen to STDIN
  process.stdin.resume();
  process.stdin.setEncoding('utf8');


  var showMessage = (err) => {
    console.log('State two');
    console.log('Type "next" to continue');
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
      //process.stdin.pause();
      process.stdin.removeListener('data', onData);

      //go to next view here
      three()
      
    } else {
      showMessage(`Invalid: ${ data }`);
    }
  };

  //listener
  process.stdin.on('data', onData)

}



module.exports = two;
