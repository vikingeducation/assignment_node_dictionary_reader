const fs = require('fs');
let saver = (results, path) => {
  path = path.trim();
  path = `./${path}`;
  fs.open(path, 'r+', (err, data) => {
    if (err) {
      fs.writeFile(path, results, 'utf8', (err) => {
        if (err) {
          throw err;
        }
        console.log("Success");
        return;
      });
    } else {
      console.log('File Exists. Would you like to overwrite?(y/n)')
      process.stdin.resume();
      process.stdin.on('data', data => {
        if (data === 'y') {
          fs.writeFile(path, results, 'utf8', (err) => {
            if (err) {
              throw err;
            }
            console.log("Success");
            return;
          });
        }
      });
    }
  })
}
module.exports = saver;
