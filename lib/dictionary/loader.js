

const fs = require('fs');

const Loader = {

  readTheDir: function(){

    return new Promise( function(resolve, reject) {

      console.log('');
      console.log('=========');
      console.log('Searching for a dictionary')

      fs.readdir('./data', function findFiles(err, files){

        if (err) reject(err);

        resolve(Loader.printTheFiles(files));

      });

    });

  },


  printTheFiles: function(fileArr){

    console.log('==========')
    console.log('type a number to select a file:')
    console.log('')

    for (var i = 0; i < fileArr.length; i++){
      console.log(`${i}. ${fileArr[i]}`)
    };

    return fileArr;

  }

}

module.exports = Loader;
