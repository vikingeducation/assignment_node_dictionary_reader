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

function parseFile(dictionary){
  let path = `./data/${dictionary}`
  let readStream = fs.createReadStream(path, 'utf8');
  let numBytes = 0;
  readStream.on('data', (data) => {
    numBytes += data.length;
    console.log(data);
  })
  readStream.on('end', () => {
    console.log(numBytes);
    console.log('Successfully loaded: dictionary.json');

  })
}


module.exports = {
  loading: loading,
  parseFile: parseFile
}
