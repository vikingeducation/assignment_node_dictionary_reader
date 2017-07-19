var load = require('./loading');
var search = require('./searching');
const dict = require('./dictionary_data.js');

const welcome =
`

Welcome to the Amazing Dictionary Tool!
========================================

`;

var StateOne = function(){
  console.log(welcome);
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
var StateTwo = function(){
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  //tell them to search!
  search.whatSearch();
    var onData = (data) => {
      if(search.searchType(data) != false){
        process.stdin.removeListener('data', onData);
           return StateThree();
       }
    }
  process.stdin.on('data', onData);
}
var StateThree = function(){
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  //tell them to search!
    var onData = (data) => {
    search.searchNow(data);
      process.stdin.removeListener('data', onData);
           return StateFour();
       }

  process.stdin.on('data', onData);
}
var StateFour = function(){

  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  //tell them to search!
    var onData = (data) => {
      if(data[0].toLowerCase() === "y" ){
          //write file
dict.SaveSearch();

       }else{ StateTwo();
          return
       }

       }

  process.stdin.on('data', onData);
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
