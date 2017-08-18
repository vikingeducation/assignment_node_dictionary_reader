var fs = require('fs');
var dictionaryData = require('./dictionaryData');

var path = './data';
var choices = 0;
var matches = [];

var loading = function () {
  fs.readdir(path, (err, data) => {
    if (err) {
      throw err;
    }
    else {
      var regex =/\w+(.json)/g;
      var match = regex.exec(data);
      while (match) {
        matches.push(match);
        match = regex.exec(data);
      }

      console.log(`---Select a dictionary to load:`)
      for (var i = 0; i < matches.length; i++) {
        console.log( `${i+1}. ${matches[i][0]}` );
        choices++;
      }
      process.stdin.resume();
      process.stdin.setEncoding('utf8');

    }
  });
  process.stdin.on('data', selection);
}



var selection = function (data) {
  data = data.trim();

  if ( (0 < Number(data))  && (Number(data) <= choices)) {
    process.stdin.pause();
    process.stdin.removeListener('data', selection);
    dictionaryData(matches[choices-1][0]);
  }
  else if (data === 'q') {
    console.log("Goodbye");
    process.exit();
  }
  else {
    console.log(`Please enter a choice between 1 and ${choices}`);
  }
};

module.exports = loading;
