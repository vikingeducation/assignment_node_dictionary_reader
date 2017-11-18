var load = require('./load');
var dictData = require('./dictData');
var search = require('./search');
var save = require('./save');
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
      var currentDictionaryBuf = load.load.readDictionary('./data/dictionaries/' + load.dictFileArray[data]);

      /// Is this an okay test to move forward?
      if(currentDictionaryBuf) {

        // Remove initial listener
        process.stdin.pause();
        process.stdin.removeListener('data', onData);

        // Convert dictionary buffer to string
        var currentDictionaryJSON = load.bufToStr(currentDictionaryBuf);
        var currentDictionary = JSON.parse(currentDictionaryJSON);
        var currentDictionaryKeys = Object.keys(currentDictionary).join(', ');
        var wordCountByLetterArray = dictData.countWordsByLetter(currentDictionary);

        // Can probably separate this out to different function
        var letterStr;
        for(var i = 0; i <= (wordCountByLetterArray.length - 1); i++) {
          var formattedCount = wordCountByLetterArray[i].currentLetter + ': ' + wordCountByLetterArray[i].letterCount + '\n';
          letterStr += formattedCount;
        }

        process.stdin.resume();
        process.stdin.setEncoding('utf8');

// Display status of dictionary load and stats
console.log(`Dictionary has been loaded:
Word count: ${wordCountByLetterArray.totalWords}
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

var onTermSelection = (dictionary, type, term) => {
  if (term) {
    process.stdin.pause();
    process.stdin.removeListener('data', onTermSelection);


    term = term.trim();
    var searchResults = search.search(dictionary, type, term);
    console.log(`Found ${searchResults.length} match(es):\n`)
    console.log(searchResults);

    // Go to save search state
    saveResults(searchResults);

  } else {
    console.log("This term is not in this dictionary. Please make another selection and try again.");
    onSearchSelection(dictionary, type);
  }
};

var saveResults = (results) => {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  process.stdin.on('data', (data) => onSaveSelection(results, data));
  console.log('Do you want to save your results? y/n? "q" quits.');

};

var onSaveSelection = (results, data) => {
  data = data.trim();

  if(data === 'y') {
    process.stdin.pause();

    // Next program state, getting file name
    getFileName(results);

  } else if(data === 'n') {
    // Do another search
    selectDictionary(dictFileStr);

  } else if(data === 'q') {
    // Exit

  } else {
    console.log("Invalid response");
    saveResults(results);
  }
};

var getFileName = (results) => {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  console.log("What file path should we write results to?");

  process.stdin.on('data', (data) => onNameSelection(results, data));
// ends getFileName
};

var onNameSelection = (results, data) => {
  // Get array of existing files
  var files = load.load.displayFiles('./data/saves');
  data = data.trim();

  var alreadyExists = 0;
  files.forEach((file) => {
    // If input matches existing file, double-check
    if(file === data) {
      alreadyExists++;
    }
    // ends files.forEach
  });

  process.stdin.pause();

  if(alreadyExists) {
      // double-check
      doubleCheck(data);

    } else {
      save.toFile(results, data);
      anotherSearch();
    }
};

var doubleCheck = (data) => {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  console.log('That file exists. Overwrite? y/n? "q" quits.');

  process.stdin.on('data', (data) => {
    data = data.trim();
    if(data === 'y') {
      // call save.toFile
      // if save is successful
        console.log("File successfully overwritten!");
    } else if(data === 'n') {
      process.stdin.pause();
    

      // call getFileName();
    } else if(data === 'q') {
      // quit
    } else {
      // invalid input
      // call doubleCheck again
    }
  });
};

var anotherSearch = () => {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  console.log('Another search? y/n? "q" quits.');

  process.stdin.on('data', (data) => {
    if(data === 'y') {
      selectDictionary(dictFileStr);
    } else if((data === 'n') || (data === 'q')) {
      // quit
    } else {
      process.stdin.pause();

      console.log("Invalid response, try again.");
      anotherSearch();
    }
  });

};

var dictFileStr = formatInitPrompt(dictFileArray);
selectDictionary(dictFileStr);
