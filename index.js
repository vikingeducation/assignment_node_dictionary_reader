let CLIModule = require('./lib/CLIModule');
let cli = new CLIModule;
let loader = require('./lib/loader');
let dictionary = require('./lib/dictionary');

let fileList;
let path = './data'

cli.intro();
loader.getJSON(path).then(function(f){
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
    let choice = cli.chooseFile(data, fileList);
    // TODO: we shouldn't have all of the logic inside this if (choice) block.. there's probably a better way
    if (choice) {
      dictionary.load(path, choice).then(function(f){
        console.log(f.toString());
      });
    }
  }
});

//

