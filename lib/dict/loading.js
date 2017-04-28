const fs = require('fs');
let dictionary;

const dataDir = '../../data/';

let list = new Promise(function(resolve, reject) {
  fs.readdir(dataDir, (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

function loadDict(selection) {
  let _dict = require(dataDir + selection);
  console.log(`Successfully loaded ${selection}`);
  dictionary = require('./dictionary')(_dict);
  dictionary.printStats();
}


module.exports = {
  list,
  loadDict
};
