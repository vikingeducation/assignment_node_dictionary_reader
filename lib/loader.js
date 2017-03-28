let fs = require('fs');

let loader = {

  getJSON: (path) => {
    return new Promise((resolve) => {
      fs.readdir(path, (err, data) => {
        if (err) throw error;

        let fileList = data.filter( (filename) => {
          return /^(.*\.json)/.test(filename);
        });

        resolve(fileList);
      });
    });
  }

};

module.exports = loader;
