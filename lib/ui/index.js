const menu = require('./menu');
const selectDict = require('./selectDict');
const info = require('./info');
const search = require('./search');

function init() => {
  menu(
    'Welcome to the Node Dictionary Reader:\n======================================',
    { q: 'Quit', 'i': 'Show General Information', 's': "Search"},
    arg => {
      switch(arg) {
        case 'q':
        case 'quit':
          process.exit();
        case 'i':
          selectDict(info);
          break;
        case 's':
          selectDict(search);
          break;
        default:
          init();
      }
    }
  );
};


module.exports = init;
