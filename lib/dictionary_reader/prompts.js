var colorizer = require('./colorizer');

var search_nums = ['1','2','3','4'].map(n => colorizer.colorize(n, 'red'));
var search_options =
`${search_nums[0]}: Exact
${search_nums[1]}: Partial
${search_nums[2]}: Begins With
${search_nums[3]}: Ends With`;

var prompts = {
  welcome:
  `Welcome to the Node Dictionary Reader!
======================================
Enter q to quit

Select a dictionary to load:`,
  invalid_selection: 'Please select a number from the list.',
  search: `You may now search in the dictionary.
What kind of search?`,
  search_options: search_options,
  search_term: 'Enter the search term:'
};

module.exports = prompts;
