const fs = require("fs");

function readDir() {
  var path = "./data";
  fs.readdirSync(path, (err, data) => {
    if (err) {
      throw err;
    }
    console.log(data);
    return data;
  });
}

module.exports = { readDir };
