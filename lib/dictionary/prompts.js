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

 module.exports = {
   formatInitPrompt,
   searchPrompt,
   selectDictionaryPrompt,
   displayDictionaryStats
 };