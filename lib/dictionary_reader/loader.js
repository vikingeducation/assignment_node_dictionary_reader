var fs = require('fs');

var path = '../../data';
var jsonLibrary = [];

function loader() {

  process.stdin.resume();
  process.stdin.setEncoding('utf8');


  fs.readdir('../../data', createLibrary);

  function createLibrary(err, data) {
      jsonLibrary = []
      if (err) {
        throw err
      }

      console.log('Select a dictionary to load:');
      data.forEach( (el,  idx) => {
        if ( /json/.test(el) ) {
          jsonLibrary.push(el)
          console.log(idx + ". " + el);
        }
      })
  }

  // fs.readFile(path, readDictionary);

  var onFile = (data) => {
    data = data.trim();

    if (jsonLibrary.length == 0) {
      console.log('There are no jason files, please add correct file to data folder!');
      process.stdin.pause();
      process.stdin.removeListener('data', onData);
    }
    if ( Number.isInteger(parseInt(data) ) && data < jsonLibrary.length && data >= 0) {

      var choosen_path =  '../../data/' + jsonLibrary[data];
      fs.readFile(choosen_path, 'utf8', (err, content) => {
        if (err) {
          throw err;
        }
        console.log('Successfully loaded: ' + jsonLibrary[data]);
        var parsedDict = JSON.parse(content);
        var keys = Object.keys(parsedDict);
        console.log( "Word count: " + keys.length);
        console.log( "Word frequency by starting letter: ")

        'abcdefghijklmnoprstquwxyvz'.split("").forEach( (letter) => {
          stats = 0;
          keys.forEach( (word) => {
            var matcher = new RegExp("^" + letter + "\\w+", "g");
            if ( matcher.test(word) ) {
              stats += 1;
            } else {
              return
            }
          })
          console.log(letter.toUpperCase() + ": " + stats);
        })
      })
    } else {
      console.log('This is an invalid json files in/data directory!');
      fs.readdir('../../data', createLibrary);
    }
  }

  process.stdin.on('data', onFile);
}

loader();
