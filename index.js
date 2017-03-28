let CLIModule = require('./lib/CLIModule');
let cli = new CLIModule;
let loader = require('./lib/loader');


process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', (data) => {
  data = data.trim();
  if (data === 'q') {
    process.exit();
  } else {
    console.log(data)
  }
});

//console.log(cli.intro());

(loader.getJSON('./data'));
