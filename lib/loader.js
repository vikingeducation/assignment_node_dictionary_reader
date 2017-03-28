let fs = require('fs');

let loader = {

  getJSONFiles: (path) => {
    let files = fs.readdirSync(path);
    return files.filter( (filename) => {
      return /^(.*\.json)/.test(filename);
    });
  }

};

module.exports = loader;
