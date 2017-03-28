const cli = require('./lib/cliModule');
// const loader = require('./lib/loader');
// const Dictionary = require('./lib/dictionary');

// // const path = './data';
// let fileList;


cli.render('welcome');







// cli.intro();

// loader.getJSON(path).then( (files) => {
//   fileList = files;
//   cli.listFiles(fileList);
// });


// process.stdin.resume();
// process.stdin.setEncoding('utf8');


// process.stdin.on('data', (data) => {
//   data = data.trim();
//   if (data === 'q') process.exit();

//   const fileName = cli.chooseFile(data, fileList);

//   if (fileName) {
//     const dic = new Dictionary(path, fileName);
//     cli.printWordCount(dic.wordCount());
//     cli.printWordFreq(dic.wordFreq);

//     cli.searchPrompt();
//     const searchType = search.runSearchType(data);

//     if (searchType) {

//     }
//   }
// });

