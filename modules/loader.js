var fs = require('fs');
var path = require('path')

var loader = {

  selectedDict: '',
  dataPath: './data',
  dictionaryList: function(){
    var dictFiles = ['dictionary.json', 'kitties.json'];
    var list = {};

    dictFiles.forEach(function(file, index) {
      list[index + 1] = file;
    });

    return list;
  },
  displayDictionaries: function() {
    console.log("Please select a dictionary by entering its number");
    var list = this.dictionaryList();

    for(var key in list){
      console.log(`${key}. ${list[key]}`);
    };
  },// displayDictionaries

  setDictionary: function(userInput) {
    var list = this.dictionaryList();
    this.selectedDict = list[userInput];
    console.log(`Now using ${this.selectedDict}`);
  }

}

module.exports = loader;
