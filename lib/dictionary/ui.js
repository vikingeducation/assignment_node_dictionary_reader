var load = require('./load');
var dictData = require('./dictData');
var search = require('./search');
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

var searchState = () => {
// Search prompt
console.log(`What kind of search?
1. Exact
2. Partial
3. Begins With
4. Ends With`);
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

        // Remove initial listener
        process.stdin.pause();
        process.stdin.removeListener('data', onData);

        // Convert dictionary buffer to string
        var currentDictionaryJSON = load.bufToStr(currentDictionaryBuf);
        var currentDictionary = JSON.parse(currentDictionaryJSON);
        var currentDictionaryKeys = Object.keys(currentDictionary).join(', ');
        var wordCountByLetterArray = dictData.countWordsByLetter(currentDictionary);
        var letterStr;
        for(var i = 0; i <= (wordCountByLetterArray.length - 1); i++) {
          var formattedCount = wordCountByLetterArray[i].currentLetter + ': ' + wordCountByLetterArray[i].letterCount + '\n';
          letterStr += formattedCount;
        }

        process.stdin.resume();
        process.stdin.setEncoding('utf8');

// Display status of dictionary load and stats
console.log(`Dictionary has been loaded:
Word count: ${dictData.totalWords}
Word frequency by starting letter:
${letterStr}`);

        // Next state of application - searching
        searchState();
        process.stdin.on("data", (data) => onSearchSelection(currentDictionaryKeys, data));


        // If currentDictionaryBuf did not load correctly
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

var onSearchSelection = (dictionary, type) => {
  type = Number(type.trim());

  if((type >= 1) && (type <= 4)) {
    process.stdin.pause();
    process.stdin.removeListener('data', onSearchSelection);

    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    console.log('Enter the search term:');
    process.stdin.on('data', (data) => onTermSelection(dictionary, type, data));

    // if search type input is invalid
  } else {
    console.log('Invalid selection, try again.');
    process.stdin.pause();
    process.stdin.removeListener('data', onSearchSelection);

    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    searchState();
    // Eleven event listeners added??
    process.stdin.on("data", (data) => onSearchSelection(dictionary, data));
  }

};

onTermSelection = (dictionary, type, term) => {
  if (term) {
    process.stdin.pause();
    process.stdin.removeListener('data', onTermSelection);


    term = term.trim();
    var searchResults = search.search(dictionary, type, term);
    console.log(searchResults);

    // Go to save search state


  } else {
    console.log("This term is not in this dictionary. Please make another selection and try again.");
    onSearchSelection(dictionary, type);
  }
};

var dictFileStr = formatInitPrompt(dictFileArray);
selectDictionary(dictFileStr);
