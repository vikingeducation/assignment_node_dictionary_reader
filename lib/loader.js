const fs = require('fs');

function load(path, callback) {

  fs.readFile(path, 'utf8', (err, data) => {
    if(err) callback(err);

    data = JSON.parse(data);
    callback(null, Object.keys(data));


    // //let regex = /^\s*\"(\w*)\"[^"]*\"[^"]*\"\,?\n?/g;
    //
    // let matchArray = [];
    // let match = regex.exec(data);
    //
    // while(match) {
    //   matchArray.push(match);
    //   match = regex.exec(exec);
    // }

  })
  /*
  let dictStream = fs.createReadStream(path, 'utf8');
  let dictString = "";

  dictStream.on('data', data => {
    dictString += data.toString();
  });
  */
}

module.exports = load;
