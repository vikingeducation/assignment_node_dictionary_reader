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

var searchPrompt = () => {
// Search prompt
console.log(`What kind of search?
1. Exact
2. Partial
3. Begins With
4. Ends With`);
};

function selectDictionaryPrompt(dictFileStr) {
  console.log(`Welcome to the Node Dictionary Reader!
======================================
Enter q to quit
Select a dictionary:
${dictFileStr}`);
}

var displayDictionaryStats = (currentDictionary, dictFileArray, data) => {
// Display status of dictionary load and stats
console.log(`Dictionary has been loaded: ${dictFileArray[data]}
Word count: ${currentDictionary.totalWords}
Word frequency by starting letter:
${currentDictionary.wordCountByLetter}`);
};

var startListening = () => {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
};

var pauseAndRemove = (listener) => {
  process.stdin.pause();
  process.stdin.removeListener('data', listener);
};

var loadDictionary = (dictionary) => {
if(dictionary) {
  startListening();
  // Next state of application - searching
  searchPrompt();
  process.stdin.on("data", (data) => onSearchSelection(dictionary.keys, data));


  // If dictionary did not load correctly
  } else {
  console.log('Error loading ' + dictFileArray[data]);
  selectDictionary(dictFileStr);
  }
};

// Initial prompt to display dictionary
var selectDictionary = (dictFileStr) => {
  
  startListening();
  selectDictionaryPrompt(dictFileStr);

  var onData = (data) => {
    
    data = data.trim();
    if((!isNaN(data)) && ((data <= dictFileArray.length) && (data > 0)) ) {
      // Delete one from input to match array properly
      data--;

      // Load dictionary with index of data
      var currentDictionaryBuf = load.load.readDictionary('./data/dictionaries/' + load.dictFileArray[data]);

      // Remove initial listener
      pauseAndRemove(onData);
      var currentDictionary = load.parseDictionary(currentDictionaryBuf);
      loadDictionary(currentDictionary);
      displayDictionaryStats(currentDictionary, dictFileArray, data);

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

  pauseAndRemove(onSearchSelection);
  // if search type is valid
  if((type >= 1) && (type <= 4)) {

    startListening();

    console.log('Enter the search term:');
    process.stdin.on('data', (data) => onTermSelection(dictionary, type, data));

    // if search type input is invalid
  } else {
    console.log('Invalid selection, try again.');
    startListening();
    searchPrompt();
  }
// ends onSearchSelection
};

var onTermSelection = (dictionary, type, term) => {
  if (term) {
    pauseAndRemove(onTermSelection);

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
// ends onTermSelection
};

var saveResults = (results) => {
  startListening();

  process.stdin.on('data', (data) => onSaveSelection(results, data));
  console.log('Do you want to save your results? y/n? "q" quits.');

};

var onSaveSelection = (results, data) => {
  data = data.trim();
  pauseAndRemove(onSaveSelection);  

  if(data === 'y') {
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
  startListening();
  console.log("What file path should we write results to?");

  process.stdin.on('data', (data) => onNameSelection(results, data));
// ends getFileName
};

var onNameSelection = (results, path) => {
  pauseAndRemove(onNameSelection);
  
  // Get array of existing files
  var files = load.load.displayFiles('./data/saves');
  path = path.trim();

  var alreadyExists = 0;
  files.forEach((file) => {
    // If input matches existing file, double-check
    if(file === path) {
      alreadyExists++;
    }
    // ends files.forEach
  });


  if(alreadyExists) {
      // double-check
      doubleCheck(results, path);

    } else {
      save.toFile(results, path);
      anotherSearch();
    }
};

var doubleCheck = (results, path) => {
  startListening();
  console.log('That file exists. Overwrite? y/n? "q" quits.');

  process.stdin.on('data', (data) => {
    data = data.trim();
    if(data === 'y') {
      save.toFile(results, path);
      // if save is successful
      console.log("File successfully overwritten!");
    } else if(data === 'n') {
      process.stdin.pause();


      // call getFileName();
    } else if(data === 'q') {
      process.stdin.end();
    } else {
      // invalid input
      // call doubleCheck again
    }
  });
};

var anotherSearch = () => {
  startListening();
  console.log('Another search? y/n? "q" quits.');

  process.stdin.on('data', (data) => {
    if(data === 'y') {
      process.stdin.pause();
      process.stdin.removeListener('data');
      selectDictionary(dictFileStr);
    } else if((data === 'n') || (data === 'q')) {
      // quit
    } else {
      process.stdin.pause();
      process.stdin.removeListener('data');

      console.log("Invalid response, try again.");
      anotherSearch();
    }
  });

};

var dictFileStr = formatInitPrompt(dictFileArray);
selectDictionary(dictFileStr);


