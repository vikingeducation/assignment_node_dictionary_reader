const colorizer = require('./colorizer');

const searchNums = ['1', '2', '3', '4'].map(n => colorizer.colorize(n, 'red'));
const searchOptions =
`${searchNums[0]}: Exact
${searchNums[1]}: Partial
${searchNums[2]}: Begins With
${searchNums[3]}: Ends With`;
const q = colorizer.colorize("'q'", 'green');

const prompts = {
  welcome:
  `Welcome to the Node Dictionary Reader!
======================================
Enter q to quit

Select a dictionary to load:`,
  invalidSelection: 'Please select a number from the list.',
  search: `\nYou may now search in the dictionary.
What kind of search?`,
  searchOptions,
  searchTerm: '\nEnter the search term:',
  saveResults: `\nDo you want to save results? y/n? ${q} quits`,
  savePath: '\nWhat filepath should we write results to?',
  fileWritten: '\nFile successfully written!',
  overwriteFile: `\nThat file exists, overwrite? y/n? ${q} quits.`,
  fileOverwritten: '\nFile successfully overwritten!'
};

module.exports = prompts;
