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

// /^[^:]+:\s*/gm - for colons
function parseFile(dictionary, allowMessage){
  return new Promise((resolve, reject)=>{
    let path = `./data/${dictionary}`
    let readStream = fs.createReadStream(path, 'utf8');

    let contents = '';

    readStream.on('data', (data) => {
      contents += data;
    });

    readStream.on('end', () => {
      let dictionary = JSON.parse(contents);
      let numberOfWords = Object.keys(dictionary).length;
      if (allowMessage){
        console.log('Successfully loaded: dictionary.json');
        console.log(`Word count: ${numberOfWords}`);
        console.log('Word frequency by starting letter:');
      }
      let tracker = firstLetterCount(dictionary);
      logLetterCount(tracker);
      resolve(dictionary);
    });
  })
}
  // let path = `./data/${dictionary}`
  // let readStream = fs.createReadStream(path, 'utf8');
  //
  // let contents = '';
  //
  // readStream.on('data', (data) => {
  //   contents += data;
  // });
  //
  // readStream.on('end', () => {
  //   let dictionary = JSON.parse(contents);
  //   let numberOfWords = Object.keys(dictionary).length;
  //   if (allowMessage){
  //     console.log('Successfully loaded: dictionary.json');
  //     console.log(`Word count: ${numberOfWords}`);
  //     console.log('Word frequency by starting letter:');
  //   }
  //   let tracker = firstLetterCount(dictionary);
  //   logLetterCount(tracker);
  //   resolve(dictionary);
  // });


function firstLetterCount(dictionary){
  let tracker = {};
  let wordCount = 0;
  for (let word in dictionary){
    let letter = word[0].toUpperCase();
    if (tracker[letter] === undefined){
      tracker[letter] = 1
    } else {
      tracker[letter]++
    }
  }
  return tracker
}

function logLetterCount(tracker){
  for (let letter in tracker){
    console.log(`${letter}: ${tracker[letter]}`)
  }
}



module.exports = {
  loading: loading,
  parseFile: parseFile
}
