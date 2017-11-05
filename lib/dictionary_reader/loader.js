"use strict";

var fs = require('fs');

function getFileNames(path) {
  return fs.readdirSync(path);
}

function loadFile(path, fileName) {
  let dictionary =  fs.readFileSync( path + fileName, 'utf-8');
  return JSON.parse(dictionary);
}


module.exports = {
  files: getFileNames('../../data/'),
  getContent: (path, fileName) => {
    return loadFile(path, fileName)
  }
}
