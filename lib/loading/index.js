const fs = require("fs");

function readDir() {
  var path = "./data";
  return fs.readdirSync(path);
}



module.exports = { readDir };
