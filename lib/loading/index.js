const fs = require("fs");

function readDir() {
  var path = "./data";
  return fs.readdirSync(path);
}

// Put listener in here for loading?

module.exports = { readDir };
