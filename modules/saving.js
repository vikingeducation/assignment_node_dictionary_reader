var fs = require('fs');
var searchedResults = "";
var path = './output';
var filePath = ""

var saving = function (stringOfResults) {
  searchedResults = stringOfResults;
  console.log('Do you want to save results? y/n? \'q\' quits.');
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', saveResults);
}

var saveResults = function (data) {
  data = data.trim();

  if ( data === 'y') {
    process.stdin.removeListener('data', saveResults);
    console.log('What filepath should we write results to?');
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', filepathToUse);
  }
  else if ( (data === 'n') || (data === 'q') ) {
    process.stdin.pause();
    process.stdin.removeListener('data', saveResults);
    console.log("Alright then, goodbye");
  }
  else {
    console.log("Invalid response, please enter y, n, or q");
  }
}

var filepathToUse = function (data) {
  filePath = data.trim();
  filePath.toString();
  fs.readdir(path,  (err, data) => {
    data = data.toString();
    if (err) {
      throw err;
    }
    else {
      var regex = new RegExp ("\\w*(" + filePath + ")\\b", 'gi');
      var match = data.match(regex);
      if (match === null) {
        fs.writeFile( (path + '/' + filePath), searchedResults, 'utf8', (err) => {
          if (err) {
            throw err;
          }
          else {
            process.stdin.pause();
            process.stdin.removeListener('data', filepathToUse);
            console.log("File created");
          }
        })
      }
      else {
        process.stdin.removeListener('data', filepathToUse);
        console.log('That file exists, overwrite? y/n? \'q\' quits.');
        process.stdin.resume();
        process.stdin.setEncoding('utf8');
        process.stdin.on('data', overWriteConfirmation);
      }
    }
  });
}

var overWriteConfirmation = function (data) {
  data = data.trim();

  if (data === 'y') {

    fs.writeFile ( (path + "/" + filePath), searchedResults, 'utf8', (err) => {
      if (err) {
        throw err;
      }
    } )
    process.stdin.pause();
    process.stdin.removeListener('data', overWriteConfirmation);
    console.log('File successfully overwritten!');
  }
  else if ( (data === 'n') || (data === 'q') ) {
    process.stdin.pause();
    process.stdin.removeListener('data', overWriteConfirmation);
    console.log('No file created');
  }
  else {
    console.log ("Please enter y, n, or q");
  }

}

module.exports = saving;
