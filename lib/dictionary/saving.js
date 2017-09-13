const fs = require('fs');
const cliui = require('./cliui');

const Saver = {

  saverUi: function(selectedFile, matchResults) {

    console.log(`

      ==============
      Would you like to:
        1: save results
        2: Perform another search
        q: quit

    `);

    var onData = function(data){

      data = data.trim();

      if (data == 'q' || data == 'quit') {
        console.log('okay, bye');
        process.stdin.pause();
      }

      else if (parseInt(data) % 1 == 0) {
        if (data == 1){
          Saver.saveTheResults(matchResults);
        } else if ( data == 2) {
          cliui.searchDictionary(selectedFile);
        } else {
          console.log('invalid selection');
        }
      }

      else {
        console.log(`invalid input: ${data}`);
      }
    }

    process.stdin.on('data', onData);

  },

  saveTheResults: function(results){

    //check if file exists
    if (!fs.existsSync('input.txt')){
      //if it doesn't exist  then make it and write it
      //wx flag forces a failure if file exists
      //https://stackoverflow.com/questions/12899061/creating-a-file-only-if-it-doesnt-exist-in-node-js
      fs.writeFile('input.txt', results, { flag: 'wx' }, (err) => {
        if (err) throw err;
        console.log("file was created and dictionary results are saved");
      });

    } else {
      //if it exits write the data
      fs.appendFile('input.txt', results, (err) => {
        if (err) throw err;
        console.log('the "dictionary results" saved to existing file');
      });
    }//end else if

  }

}

module.exports = Saver;
