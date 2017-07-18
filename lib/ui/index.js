const menu = require('./menu');
const ui = require('./ui');

module.exports = () => {
  console.log('Welcome to the Node Dictionary Reader:');
  console.log('======================================');

  menu(
    'Enter q to quit or c to continue',
    { q: 'Quit', c: 'Continue' },
    arg => {
      if (arg === 'q' || arg === 'quit') {
        process.exit(); // end the process immediately
      }

      //UI STUFF
      ui();
    }
  );
};
