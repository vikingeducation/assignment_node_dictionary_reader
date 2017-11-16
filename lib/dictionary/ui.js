var load = require('./load');
var dictData = require('./dictData');
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
      var currentDictionaryBuf = load.load.readDictionary('./data/' + load.dictFileArray[data]);

      if(currentDictionaryBuf) {
        // Convert dictionary buffer to string
        var currentDictionaryJSON = load.bufToStr(currentDictionaryBuf);
        var currentDictionary = JSON.parse(currentDictionaryJSON);
        var wordCountByLetterArray = dictData.countWordsByLetter(currentDictionary);
        var letterStr;
        for(var i = 0; i <= (wordCountByLetterArray.length - 1); i++) {
          var formattedCount = wordCountByLetterArray[i].currentLetter + ': ' + wordCountByLetterArray[i].letterCount + '\n';
          letterStr += formattedCount;
        }

        // Display status of dictionary load and stats
console.log(`Dictionary has been loaded:
Word count: ${dictData.totalWords}
Word frequency by starting letter:
${letterStr}`);

      } else {
        console.error('Error loading ' + dictFileArray[data]);
        // call function again?
      }
    // If data is an invalid entry
    } else {
      // Display error and reinitialize function
      console.error('You have made an invalid selection. Please make a valid selection and try again.');
      selectDictionary(dictFileStr);
    }
  // Ends onData
  };

  process.stdin.on('data', onData);
// Ends selectDictionary
};

var dictFileStr = formatInitPrompt(dictFileArray);
selectDictionary(dictFileStr);
