var loader = require('./loader');
var dictionary_reader = require('./dictionary_reader');
var Searcher = require('./searcher');
var Saver = require('./saving');

const Ui = {

  beginListening: function() {

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
        loader.readTheDir()
        .then(function(arrayOfFiles) {
          Ui.selectDictionaryFile(arrayOfFiles, data);
          process.stdin.removeListener('data', onData);
        });
      }

      else {
        console.log('invalid input')
      };

    };//end on data

    //listener
    process.stdin.on('data', onData)

  },//end beginListening



  selectDictionaryFile: function (arrayOfFiles, data){
    //console.log(arrayOfFiles);

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
          dictionary_reader.loadItUp(selectedFile)
          .then(function() {
            process.stdin.removeListener('data', onData);
            Ui.searchDictionary(selectedFile);
          })
          .catch((error) => {
            console.error(error);
          })
        };
      } //end else if (parseInt(data) % 1 == 0)

      else {
        console.log(`invalid input: ${data}`)
      }

    };//end on data

    process.stdin.on('data', onData)

  },//end selectDictionaryFile



  searchDictionary: function(selectedFile) {

    console.log(`

      ==============
      What kind of search would you like to perform on ${selectedFile}?
        1: Exact
        2: Partial
        3: Begins With
        4: Ends With

    `)


    var onData = function(data){

      data = data.trim();

      if (data == 'q' || data == 'quit') {
        console.log('okay, bye');
        process.stdin.pause();
      }

      else if (parseInt(data) % 1 == 0) {
        Searcher.searchListener(data, selectedFile);
        process.stdin.removeListener('data', onData);
      }

      else {
        console.log(`invalid input: ${data}`)
      }
    }

    process.stdin.on('data', onData);

  }//end searchDictionary







};//end ui

module.exports = Ui;
