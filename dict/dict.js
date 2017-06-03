var ui = require('./ui');
var loader = require('./loader');
var processer = require('./processer')
var searcher = require('./searcher')

function init() {
  ui.init();
  var files = loader.readDictPaths();
  ui.listFiles(files)
  ui.promptFiles();
  readInput();
}

function gameLoop(userText) {
  var foundDict = loader.findDict(userText.trim());
  if (foundDict) {
    ui.success(foundDict);
    var dictObj = loader.loadDict(foundDict);
    var stats = processer.processInput(dictObj);

    ui.reportStats(stats);
  } else {
    ui.noFind();
  }
}

function readInput() {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  process.stdin.on('data', gameLoop)
}

module.exports = {
  init: init
}
