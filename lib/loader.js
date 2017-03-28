let fs = require('fs');

let loader = {
  getJSON: function(path){
    fs.readdir(path, (err, data) => {
      if (err) throw error;
      
      let fileList = data.filter( (filename) => {
        return /^(.*\.json)/.test(filename);
      });

      return fileList;
    });
  }


}

module.exports = loader;