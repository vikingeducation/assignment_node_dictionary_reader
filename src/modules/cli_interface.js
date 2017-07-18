var load = require('./loading');

var StateOne = function(){
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  load.displayDictionaries();
    var onData = (data) => {
      if(load.FindDictionary(data) != false){
        process.stdin.removeListener('data', onData);
           return StateTwo();
       }
    }
  process.stdin.on('data', onData);
}
var StateTwo = function() {

}



var init = function() {

  StateOne();
}


function EnterOperation(){
  process.stdin.resume();
  process.stdin.setEncoding("utf8");

  process.stdin.on('data', (data) => {
    //Take search term
    //send to searching

  })

}



module.exports = { "init": init}
