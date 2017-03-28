let CLIModule = require('./lib/CLIModule');
let cli = new CLIModule;
let loader = require('./lib/loader');

let fileList;

cli.intro();
loader.getJSON('./data').then(function(f){
  fileList  = f;
  cli.listFiles(fileList);
})


process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', (data) => {
  data = data.trim();
  if (data === 'q') {
    process.exit();
  } else {
    cli.handleInput(data, cli.chooseFile, fileList);
    console.log('got here');
  }
});

//

