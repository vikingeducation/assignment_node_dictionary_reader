var load = require('./loading');
process.stdin.resume();
process.stdin.setEncoding("utf8");



var loadDictionary = function(data){
  load.FindDictionary(data);
  process.stdin.removeListener('data', loadDictionary());
}

var init = function() {
  process.stdin.on('data', loadDictionary)
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
