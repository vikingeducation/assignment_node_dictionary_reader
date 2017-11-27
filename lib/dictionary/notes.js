var load = require('./load');
var dictData = require('./dictData');
var search = require('./search');
var save = require('./save');
var dictFileArray = load.dictFileArray;

// =================================
// Formatting and Prompts
// Format array for UI list
let formatInitPrompt = (fileArray) => {
   let arrayCopy = fileArray.slice();
   for(let i = 0; i < fileArray.length; i++) {
      arrayCopy[i] = Number(i + 1) + '. ' + fileArray[i] + '\n';
   }

   let fileStr = arrayCopy.join('');
   return fileStr;
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
return currentDictionary;
};

var searchPrompt = () => {
   // Search prompt
   console.log(`What kind of search?
   1. Exact
   2. Partial
   3. Begins With
   4. Ends With`);
   };

// =========================================
// STDIN and event listeners
var startListening = () => {
   process.stdin.resume();
   process.stdin.setEncoding('utf8');
 };

 var pauseAndRemove = (listener) => {
   process.stdin.pause();
   process.stdin.removeListener('data', listener);
 };

// =========================================
// Async functions with promises
async function getAvailableDictionaries() {
   let dictFileArray = load.dictFileArray;

   let promise = new Promise((resolve, reject) => {
      if(dictFileArray) {
         resolve(formatInitPrompt(dictFileArray));
      } else {
         reject(console.log('Error reading dictionary directory'));
      }
   });

   let dictFileStr = await promise;
   selectDictionaryPrompt(dictFileStr);
}

async function onDictionarySelection(data) {
   // get rid of the event listener (on Dictionary Selection)
   pauseAndRemove(onDictionarySelection);

   data = data.trim();
   let promise = new Promise((resolve, reject) => {
      if((!isNaN(data)) && ((data <= dictFileArray.length) && (data > 0)) ) {
         // Delete one from input to match array properly
         data--;
          
         // Load dictionary with index of data
         var currentDictionaryBuf = load.load.readDictionary('./data/dictionaries/' + load.dictFileArray[data]);
         // set current dictionary variable (parses object)
         var currentDictionary = load.parseDictionary(currentDictionaryBuf);
         // display dictionary stats
         resolve(displayDictionaryStats(currentDictionary, dictFileArray, data));
      } else {
         // add event listener?
         reject(console.log('Invalid dictionary selection.'));
      }
   });

   let currentDictionary = await promise;
   return currentDictionary;
}

function onSearchSelection(dictionary, type) {
   type = Number(type.trim());
   pauseAndRemove(onSearchSelection);

   // if search type is valid
   if((type >= 1) && (type <= 4)) {
      startListening();
      console.log('Enter your search term:');
      process.stdin.on('data', (data) => onTermSelection(dictionary, type, data)); 
   } else {
      console.log('Invalid search selection, try again.');
   }
}

function onTermSelection(dictionary, type, term) {
   pauseAndRemove(onTermSelection);
   term = term.trim();

   var searchResults = search.search(dictionary, type, term);
   console.log(`Found ${searchResults.length} match(es):\n`)
   console.log(searchResults);

}

// ==================================
// Program Logic

getAvailableDictionaries();
// Start listening
startListening();
// Add data event listener (on Dictionary Selection)
process.stdin.on('data', (data) => onDictionarySelection(data));


// display search option prompt
searchPrompt();
// Start listening
startListening();
// Add data event listener (on Search Selection)
process.stdin.on('data', (data) => onSearchSelection(data));

console.log('Do you want to save your results? y/n?');



// on search selection
      // remove event listener (on Search Selection)
      // trigger async function (on Search Selection)
         // searchResults = results of promise
         // console.logs = consumers of promise

// display save option prompt
// Start listeninng
// Add data event listener (on Save Selection)
   // on Save Selection
      // get rid of the event listener (on Save Selection)
      // trigger async function (on Save Selection)

// display prompt to get file name
// Start listening
// Add data event listener (on File Name Selection)
   // on File Name Selection
      // remove event listener (on File Name Selection)
      // trigger async function (on file Name Selection)
      // promise = result of alreadyExists
         // (if file exists)
            // start listening
            // Add data event listener (just a callback this time)
            // Ask if user wants to overwrite
               // (if yes) (put in callback)
                  // save to file
                  // trigger another search
               // (if no) Display prompt to get file name again