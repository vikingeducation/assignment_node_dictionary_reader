const fs = require('fs');

function load(path, callback) {
  console.log(process.argv.slice(1, 2));
  const objectVersion = require('./README.md');
  const words = Object.keys(objectVersion);
  callback(words.length);

  // fs.readFile(path, 'utf8', (err, data) {
  //   if(err) callback(err);

  //   let regex = /^\s*\"(\w*)\"[^"]*\"[^"]*\"\,?\n?/g;

  //   let matchArray = [];
  //   let match = regex.exec(data);

  //   while(match) {
  //     matchArray.push(match);
  //     match = regex.exec(exec);
  //   }

  // })
  /*
  let dictStream = fs.createReadStream(path, 'utf8');
  let dictString = "";

  dictStream.on('data', data => {
    dictString += data.toString();
  });
  */
}

module.exports = load;
