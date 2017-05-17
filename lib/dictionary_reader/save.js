const fs = require('fs');

const ifFileExists = (path) => {
  return fs.existsSync(path);
};

const writeFile = (path, words, dictionary) => {
  let results = {};
  words.forEach((word) => {
    results[word] = dictionary[word];
  });
  results = JSON.stringify(results, null, '\n');
  fs.writeFile(path, results, 'utf8', (err) => {
    if (err) throw err;
  });
};

module.exports = {
  ifFileExists: ifFileExists,
  writeFile: writeFile
};