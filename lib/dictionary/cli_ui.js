var loader = require('./loader');
var dictionary_reader = require('./dictionary_reader');


const UI = {

  beginLitening: function() {

    //log the welcome message
    console.log(`
      Welcome to gregory\'s Node Dictionary Reader!
      =============================================
      Enter q to quit');

      Enter load to load a dictionary

    `);

    //start listining
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    var onData = function(data){

      data = data.trim();

      if (data == 'q' || data == 'quit') {
        console.log('okay, bye');
        process.stdin.pause();
      }

      else if (data == 'load') {
        //load up dictionary directory
        loader.readTheDir().then(function(arrayOfFiles){
          UI.selectDictionaryFile(arrayOfFiles, data);
          process.stdin.removeListener('data', onData);
        });
      }

      else {
        console.log('invalid input')
      };

    };//end on data

    //listener
    process.stdin.on('data', onData)

  },//end beginLitening



  selectDictionaryFile: function (arrayOfFiles, data){
    console.log(arrayOfFiles);

    var onData = function(data){

      data = data.trim();

      if (data == 'q' || data == 'quit') {
        console.log('okay, bye');
        process.stdin.pause();
      }

      else if (parseInt(data) % 1 == 0) {//if data is an integer

        var selectedFileNumber = data - 1;
        var selectedFile = arrayOfFiles[selectedFileNumber];

        if (selectedFile === undefined) {
          console.log('That is not a good file number, try again')
        } else {
          console.log('the file you selected is: ' + selectedFile);
          dictionary_reader.loadItUp(selectedFile);
        };
      } //end else if (parseInt(data) % 1 == 0)

      else {
        console.log(`invalid input: ${data}`)
      }

    };//end on data

    process.stdin.on('data', onData)

  }//end selectDictionaryFile




}//end ui

module.exports = UI;
