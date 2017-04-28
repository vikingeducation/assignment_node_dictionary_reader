const fs = require('fs');

let _result;
let _save = false;
let _file = false;
const dataDir = '../../data/';

function init(results, search) {

  _result = results;

  // Start listening to STDIN
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  // Initital check
  console.log('Do you want to save the results? y/n');

  // Handler for STDIN data
  // event
  var onData = (data) => {
    data = data.trim();

    if (data === 'y' && !_save) {
      _save = true;
      console.log('What file should we write the results to?');
    } else if (data === 'n' && !_save) {
      process.stdin.pause();
      process.stdin.removeListener('data', onData);
      return;
    } else if (_save && !_file) {
      _file = data;

      if (fs.existsSync(dataDir + _file)) {
        console.log('File exists.  Do you want to overwrite? (y/n)');
      } else {
        process.stdin.pause();
        process.stdin.removeListener('data', onData);
        saveResults();
      }

    } else if (_save && _file && data === 'y') {
      process.stdin.pause();
      process.stdin.removeListener('data', onData);
      saveResults();
    } else if (_save && _file && data === 'n') {
      _file = false;
      console.log('What file should we write the results to?');
    } else {
      _file = false;
      _save = false;
      console.log('Do you want to save the results? y/n');
    }
  };

  // Set the listener
  process.stdin.on('data', onData);
}

function saveResults() {
  fs.writeFileSync(dataDir + _file, JSON.stringify(_result));
  console.log('File saved');
}


module.exports = {
  init
};
