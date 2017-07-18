const loader = require("./load.js");
const search = require('./search.js');


//listen for user_input
function startMessage() {

 // Start listening to STDIN
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

 // Inline function to handle message output
  function showMessage() {
    console.log('Welcome to the fabulous Dictionary Ready!');
    console.log("=========================================");
    console.log("Enter q to quit\n");
    console.log("Select a dictionary:");

   loader.getDicts( function (data) { // start of loader.getDicts
      for (let i = 0; i < data.length; i++) {
        let dictString = `${i + 1}. ${data[i]}`;
        console.log(dictString);
      }

      let repeat = true;
      let dictionaryMonster = function (input_data) { // start of process.stdin
        input_data = parseInt(input_data.trim());

       //not number
        if (isNaN(input_data)) {
          console.log ("It's not a number! Please, choose another.");
          repeat = true;
        }
        else if (input_data < 1 || input_data > data.length) {
          //range check
          console.log ("It's not in a range from 1 to " + data.length + ". Please, choose another.");
          repeat = true;
        } else {
          //read file
          process.stdin.pause();
          process.stdin.removeListener('data', dictionaryMonster);
          loader.getFile( data[ input_data - 1], function(dict) {
            searchFormat(dict);
          }); // end of loader.getFile
        }
      }
      while (repeat) { // start of while loop
        repeat = false;
        ///get user input

        process.stdin.on('data', dictionaryMonster); // end of process.stdin
      } //end of while loop

    }); // end of loader.getDicts
  } // end of showMessage

 showMessage();

}//end of start

function searchFormat(dict) {
  //print user message
  console.log('What kind of search??');
  console.log('1: Exact\n2: Partial\n3: Begins With\n4: Ends With');
  process.stdin.resume();

  let repeat = true;
  let searchMonster = function (input_data) { // start of process.stdin
     input_data = parseInt(input_data.trim());
     //not number
      if (isNaN(input_data)) {
        console.log ("It's not a number! Please, choose another.");
        repeat = true;
      }
      else if (input_data < 1 || input_data > 4) {
        //range check
        console.log ("It's not in a range from 1 to 4. Please, choose another.");
        repeat = true;
      } else {

        //search
        process.stdin.pause();
        process.stdin.removeListener('data', searchMonster);
        const searchTypes = ["", "exactMatch", "partialMatches", "beginsWith", "endsWith"];

        searchWord(dict, searchTypes[input_data]);
      }
    }

  while (repeat) { // start of while loop
        repeat = false;
        ///get user input
        process.stdin.on('data', searchMonster); // end of process.stdin
      } //end of while loop
}

function searchWord(dict, searchType) {
  console.log("Type the string to search.")
  process.stdin.resume();

  process.stdin.on("data", function(data) {
    // console.log("Type: " + searchType);
    // console.log("Data: " + data);
    // console.log(search);
    console.log(search[searchType](dict, data));
  });
}

// Start the app
startMessage();
