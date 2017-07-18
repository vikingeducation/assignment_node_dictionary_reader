var load = require('./loading');
process.stdin.resume();
process.stdin.setEncoding("utf8");
var init = function() {


  process.stdin.on('data', (data) => {
    if(load.FindDictionary(data) === false){
              // do we need to remove listeners?
              //  process.stdin.removeListener('data', init);
              //init();
     }
      else {
            //process.stdin.pause(); return

      }
    })
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
