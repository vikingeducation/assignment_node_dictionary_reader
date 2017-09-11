

const fs = require('fs');

const Loader = {

  readTheDir: function(){

    return new Promise( function(resolve, reject) {

      console.log(`

        ====================
        Searching for a dictionary

        `);

      fs.readdir('./data', function(err, files) {

        if (err) reject(err);

        resolve(Loader.printTheFiles(files));

      });
    });
  },


  printTheFiles: function(fileArr){

    console.log(`

      ====================
      Type a # to select a file:

      `);

    for (var i = 0; i < fileArr.length; i++){
      console.log(`${i + 1}. ${fileArr[i]}`)
    };

    return fileArr;

  }

};//end Loader

module.exports = Loader;
