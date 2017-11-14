var load = require('./load');
var dictFileArray = load.dictFileArray;

// Format array for UI list
var formatInitPrompt = (fileArray) => {
  var arrayCopy = fileArray.slice();
  for(let i = 0; i < fileArray.length; i++) {
    arrayCopy[i] = Number(i + 1) + '. ' + fileArray[i] + '\n';
  }
  
  var fileStr = arrayCopy.join('');
  return fileStr;
};

// Initial prompt to display dictionary
var selectDictionary = (dictFileStr) => {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

console.log(
`Welcome to the Node Dictionary Reader!
======================================
Enter q to quit
Select a dictionary:
${dictFileStr}`
);

  var onData = (data) => {
    data = data.trim();
    if((!isNaN(data)) || (data <= dictFileArray.length) ) {
      // Delete one from input to match array properly
      data--;

      // Load dictionary with index of data
      var currentDictionary = load.load.readDictionary('./data/' + load.dictFileArray[data]);

      if(currentDictionary) {
        // Display statistics
        console.log('Dictionary has been loaded.');
      } else {
        console.error('Error loading ' + dictFileArray[data]);
        // call function again?
      }
    } else {
      // If input is not valid, display error and reinitialize function
      console.error('You have made an invalid selection. Please make a valid selection and try again.');
      selectDictionary(dictFileStr);
    }
  };

  process.stdin.on('data', onData);

};

var dictFileStr = formatInitPrompt(dictFileArray);
selectDictionary(dictFileStr);
