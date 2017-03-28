let fs = require('fs')

let dictionary = {
  load: function(path, filename){
    return new Promise((resolve) => {
      fs.readFile(`${path}/${filename}`, (err, data) => {
        if (err) throw err;
        resolve(data);
      });
    })
  }
}

module.exports = dictionary;