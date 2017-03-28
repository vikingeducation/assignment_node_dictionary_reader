let fs = require('fs');

let loader = {
  getJSON: function(path){
    return new Promise((resolve) => {
      fs.readdir(path, (err, data) => {
        if (err) throw error;

        let fileList = data.filter( (filename) => {
          return /^(.*\.json)/.test(filename);
        });
         resolve(fileList);
      });
    })
  }


}

module.exports = loader;


// var p = new Promise((resolve) => {
//   fs.mkdir(path, (err) => {
//     if (err) {
//       throw err;
//     }
//     resolve(path);
//     console.log(`Successfully created directory: ${ path }`);
//   });
// });