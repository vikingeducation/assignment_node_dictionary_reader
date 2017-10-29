var fs = require('fs');

var path = '../../data';

function loader() {

  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  fs.readdir(path, (err, data) => {
    if (err) {
      throw err
    }

    var jsonLibrary = createJsonLib(data);

    var createJsonLib = (data) => {
      if ( /json/.test(data) ) {
        data.forEach( (el,  idx) => {
          if ( /json/.test(el) ) {
            jsonLibrary.push(el)
          }
        })
      }
    }


    var onFiles = () => {
      // Here is our loop
      if ( jsonLibrary.length > 0 ) {
        jsonLibrary.forEach( (el,  idx) => {
          console.log('Select a dictionary to load:');
          console.log(idx + ". " + el);
        })
      } else {
        console.log('There are no json files in/data directory!');
      }

    })

  }

  var invalidAnswer = (err) => {
    if (err) {
      console.error(err);
    }
  }

  var onAnswer = (answer) => {
    answer = answer.trim();

    if ( Number.isInteger(answer) && answer <= jsonCount) {
      process.stdin.pause();
      process.stdin.removeListener('data', onData);
      return answer
      // run dictionary loader
    } else {

      invalidMessage(`Invalid: ${ answer }`);
    }
  };

}
