var fs = require('fs');
var path = require('path')

var loader = {

  dataPath: './data',
  dictPath: './data/dictionary.json',
  dictionaryList: function(){
    //   var list = {};
    // fs.readdir(this.dataPath, (err, data) => {
    //   if (err) {
    //     throw err;
    //   }

    //   data.forEach(function(file, index) {
    //     list[index + 1] = file;
    //   });
    //   // console.log(17);
    //   // console.log(list);
    // });
    //   return list;
  },
  displayDictionaries: function() {
    console.log("Please select a dictionary by entering its number");
    console.log(25);
    console.log(this.dictionaryList());

  }

}
// console.log(loader.dictionaryList());
module.exports = loader;
