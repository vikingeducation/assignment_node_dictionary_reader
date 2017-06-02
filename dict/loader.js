var fs = require('fs')
var folderPath = '/Users/grahamturner/projects/viking/assignment_node_dictionary_reader/data'

function findDict(input) {
  return 'dictionary.json';
}

function readDictPaths() {
  return fs.readdirSync(folderPath);
}

function loadDict(fileName) {
  return require(`../data/${fileName}`)
}

module.exports = {
  readDictPaths: readDictPaths,
  findDict: findDict,
  loadDict: loadDict
}