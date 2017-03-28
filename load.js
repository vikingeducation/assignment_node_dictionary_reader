var fs = require('fs')

var loadDict = {
  "loader": function(filename){
    var path = `./data/${filename}`;
    fs.readFileSync(path, 'utf8', (err, data) => {
      if (err) throw err;
      return data 
    });
  };
};

module.exports = loadDict;