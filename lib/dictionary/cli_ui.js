var loader = require('./loader')


const UI = {


  beginLitening: function() {

    //log the welcome message
    console.log('Welcome to gregory\'s Node Dictionary Reader!');
    console.log('=============================================');
    console.log('Enter q to quit')

    //start listining
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', function(data){

      data = data.trim();


      if (data == 'q' || data == 'quit') {

        console.log('okay, bye');
        process.stdin.pause();
      }

      if (data == 'load') {
        //load up dictionary directory
        loader.readTheDir().then(function(result){
          console.log(result);
        });
      }

    });

  }//end beginLitening




}//end ui

module.exports = UI;
