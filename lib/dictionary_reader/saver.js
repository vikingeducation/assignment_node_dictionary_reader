var fs = require('fs');

function prompter(results) {

  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  var promptForSaving = (err) => {
    console.log("Do you want to save results? y/n? 'q' quits.");
    if (err) {
      console.error(err);
    }
  };

  promptForSaving();

  var onData = (answer) => {
    answer = answer.trim();

    if (answer == 'y') {
      process.stdin.pause();
      process.stdin.removeListener('data', onData);
      promptForFile(results, this);
    } else if (answer == 'n') {
      process.stdin.pause();
      process.stdin.removeListener('data', onData);
      this.dictionaryReader.init();
    } else if (answer === 'q') {
      process.stdin.pause();
      process.stdin.removeListener('data', onData);
      console.log('Goodbye!');
    } else {
      promptForSaving(`Invalid data typed: ${ answer }. Please sepcify the answer again.`);
    }
  };

  process.stdin.on('data', onData);


  function promptForFile(results, obj) {

    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    var askForFile = (err) => {
      console.log('What file should we write results to? Provide full name with txt extension!')
      if (err) {
        console.error(err);
      }
    };

    askForFile();

    var onData = (answer) => {
      answer = answer.trim();

      if (/txt/.test(answer) ) {
        fs.stat('./data/' + answer, function(err, stat) {
          if(err == null) {
            // console.log('File exists, overwrite? y/n? 'q' quits.');
            process.stdin.pause();
            process.stdin.removeListener('data', onData);
            promptOverwrite('./data/' + answer, results, obj);
          } else if(err.code == 'ENOENT') {
            fs.writeFileSync('./data/' + answer, results);
            console.log('File successfully written!');
            process.stdin.pause();
            process.stdin.removeListener('data', onData);
            obj.dictionaryReader.init();
          } else {
            askForFile(`Invalid data typed: ${ answer }. Please sepcify the answer again. ${err.code}`);
          }
        });
      } else {
        askForFile(`Incorrect file type ${ answer }. Please sepcify the answer again.`);
      }
    };

    process.stdin.on('data', onData);
  }



  function promptOverwrite(filePath, results, obj)  {

    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    var overwrite = (err) => {
      console.log("That file exists, overwrite? y/n? 'q' quits.")
      if (err) {
        console.error(err);
      }
    };

    overwrite();

    var onData = (answer) => {
      answer = answer.trim();
      if (answer == 'y') {
        fs.writeFileSync(filePath, results);
        console.log('File successfully overwritten!');
        process.stdin.pause();
        process.stdin.removeListener('data', onData);
        obj.dictionaryReader.init();
      } else if (answer == 'n') {
        process.stdin.pause();
        process.stdin.removeListener('data', onData);
        obj.dictionaryReader.init();
      } else if (answer === 'q') {
        process.stdin.pause();
        process.stdin.removeListener('data', onData);
        console.log('Goodbye!');
      } else {
        overwrite(`Invalid data typed: ${ answer }. Please sepcify the answer again.`);
      }
    };

    process.stdin.on('data', onData);
  }

}


module.exports = function(dictionaryReader) {
  return {
    dictionaryReader,
    prompter
  };
};
