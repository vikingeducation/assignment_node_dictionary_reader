const config = require('./config');
const load = require('./load');

const init = () => {

  const enableInput = () => {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
  };

  const displayIntro = () => {
    for (var key in config.welcome) {
      console.log(config.welcome[key]);
    }
    load.listDictionaries();
  };

  const handleInput = () => {
    process.stdin.on('data', (input) => {
      input = input.trim();
      if (input === 'q') {
        process.exit();
      } else if (load.isDictionary(input)) {
        // console.log("You've loaded a dictionary! ...not really (yet!)");
        load.openDictionary(input);
      } else {
        console.log(`Sorry, the command '${ input }' was not recognized. Please try again.`);
      }
    });
  };

  enableInput();
  displayIntro();
  handleInput();
};

module.exports = {
  init: init
};