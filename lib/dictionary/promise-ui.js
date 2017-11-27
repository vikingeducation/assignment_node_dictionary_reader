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

var dictionariesLoad = (data) => {
   return new Promise((resolve, reject) => {
      if(dictFileArray) {
         resolve(selectDictionaryPrompt(dictFileStr));
      } else {
         reject('Dictionary has not loaded. Please try again.');
         // reinitialize dicitonaryLoad
      }
   });
};

var dictionarySelect = (data) => { 
  data = data.trim(); 
  return new Promise((resolve, reject) => {
      if((!isNaN(data)) && ((data <= dictFileArray.length) && (data > 0)) ) {
         resolve(loadDictionary(data));
      } else {
         reject(
         console.error('Your selection doesn\'t match a dictionary. Please try again'));
         // reinitialize dictionary select
      }

   });
}


var loadDictionary = (data) => {
  // Delete one from input to match array properly
  data--;
  
  // Load dictionary with index of data
  var currentDictionaryBuf = load.load.readDictionary('./data/dictionaries/' + load.dictFileArray[data]);

  // Remove initial listener
  pauseAndRemove(dictionarySelect);
  var currentDictionary = load.parseDictionary(currentDictionaryBuf);
  confirmDictionary(currentDictionary);
  displayDictionaryStats(currentDictionary, dictFileArray, data); 

};

var confirmDictionary = (dictionary) => {
  if(dictionary) {
    startListening();
    // Next state of application - searching
    process.stdin.on("data", (data) => onSearchSelection(dictionary.keys, data));
  
  
    // If dictionary did not load correctly
    } else {
    console.log('Error loading ' + dictFileArray[data]);
    //selectDictionary(dictFileStr);
    }
  };
 

/* 
LOGIC
==========================
*/

// Formats array of files into a string
var dictFileStr = formatInitPrompt(dictFileArray);

// Load list of dictionaries for user to select
dictionariesLoad(dictFileStr).
  then();

// listen for dictionary selection
startListening();
process.stdin.on('data', (data) => dictionarySelect(data));

searchPrompt();




