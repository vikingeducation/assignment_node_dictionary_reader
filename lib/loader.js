var fs  = require('fs');

var loader = {
  readFiles: function(directory) {
    fs.readdir(directory, (err, data) => {
      if (err) {
        throw err;
      }
      console.log(data);
    });
  }
}

module.exports = loader;
