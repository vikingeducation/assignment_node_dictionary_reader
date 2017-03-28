let fs = require('fs');

let loader = {
  getJSON: function(path){
    fs.readdir(path, (err, data) => {
      if (err) {
        throw err;
      }
      let regex = /\.json/;
      data.forEach(function(filename){
        if (regex.exec(filename)){
          console.log(filename);
        }
      })
    })
  }


}

module.exports = loader;