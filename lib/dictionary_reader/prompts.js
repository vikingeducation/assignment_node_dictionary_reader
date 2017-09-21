var colorizer = require('./colorizer');

var searchNums = ['1','2','3','4'].map(n => colorizer.colorize(n, 'red'));
var searchOptions =
`${searchNums[0]}: Exact
${searchNums[1]}: Partial
${searchNums[2]}: Begins With
${searchNums[3]}: Ends With`;
var q = colorizer.colorize("'q'", 'green');

var prompts = {
  welcome:
  `Welcome to the Node Dictionary Reader!
======================================
Enter q to quit

Select a dictionary to load:`,
  invalidSelection: 'Please select a number from the list.',
  search: `\nYou may now search in the dictionary.
What kind of search?`,
  searchOptions: searchOptions,
  searchTerm: '\nEnter the search term:',
  saveResults: `\nDo you want to save results? y/n? ${q} quits`,
  savePath: '\nWhat filepath should we write results to?'
};

module.exports = prompts;
