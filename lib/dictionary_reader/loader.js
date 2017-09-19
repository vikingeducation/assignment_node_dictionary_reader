var fs = require('fs');

function Loader(path, callback) {
  fs.readdir(path, (err, files) => {
    if (err) {
      return callback(err);
    }
    callback(null, files);
  });
}



module.exports = Loader;
