const fs = require('fs');

let dictionaries = {};

function loading() {
  return new Promise((resolve, reject) => {
    let path = './data/';

    fs.readdir(path, (err, data) => {
      if (err){
        reject(err);
      }

      let filtered = data.filter((file) => {
        return (/\.(json)$/i).test(file);
      });
      
      filtered.forEach((file, i) => {
        dictionaries[i + 1] = file;
      })

      resolve(dictionaries);
    });
  });
}


module.exports = {
  loading: loading
}
