var fs  = require('fs');
var dictionaryDirectory = './data';

var loader = {};

loader.readFiles = () => {
  return new Promise(function(resolve, reject) {
    fs.readdir(dictionaryDirectory, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

loader.loadDictionaryFile = (filename) => {
  return new Promise(function(resolve, reject) {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      resolve((data));
    });
  });
}

loader.listAvailableDictionaries = () => {
  loader.readFiles().then( (data) => {
      data.forEach( (file, index, data) => {
        console.log(`${index+1}: ${file}`);
      });
  }).catch( (error) => {
    console.error(error);
  });
}

loader.loadDictionary = (choice) => {
  return new Promise(function(resolve, reject) {
    loader.readFiles().then( (data) => {
      //given array of files, check if choice is a key value
      if (Object.keys(data).includes(choice)) {
        resolve(data[choice-1]);
      } else {
        reject(new Error("Not a valid choice.  Please try again!"));
      }
    }).catch( (error) => {
      reject(error);
    });
  });
}


module.exports = loader;
