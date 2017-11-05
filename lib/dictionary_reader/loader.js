"use strict";

var fs = require('fs');

function getFileNames(path) {
  var getFiles = fs.readdirSync(path);
  var jsonFiles = [];
  getFiles.forEach( (el,  idx) => {
    if ( /json/.test(el) ) {
      jsonFiles.push(el)
    }
  });
  return jsonFiles;
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
