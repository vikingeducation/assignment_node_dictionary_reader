var fs = require('fs')
let path = require('path');

let dictionaryPath = path.join(__dirname, "..", "/data/dictionary.json");

module.exports.loadfile = (path) => {
  fs.readFile(path, 'utf8', (err, data) => {
  //if(err){throw 'file not found'}
  return JSON.parse(data);
  })
}

let dirPath = path.join(__dirname, "..", "/data");

module.exports.availableDictionaries = () => {
  fs.readdir(dirPath, (err, data) => {
    console.log( data );
  });
}

// module.exports.loadFile = loadFile;
// module.exports.availableDictionaries = availableDictionaries;


// = {
//  "loadFile": loadFile,
//  "availableDictionaries": availableDictionaries
// }
