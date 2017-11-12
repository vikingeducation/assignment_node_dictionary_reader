var loader = require('./load');

var loadInitPrompt = (fileArray) => {
  for(let i = 0; i < fileArray.length; i++) {
    fileArray[i] = Number(i + 1) + '. ' + fileArray[i] + '\n';
  }

  var fileStr = fileArray.join('');

console.log(
`Welcome to the Node Dictionary Reader!
======================================
Enter q to quit
Select a dictionary:
${fileStr}`
  );
};

loadInitPrompt(loader.load('../assignment_node_dictionary_reader/data'));
