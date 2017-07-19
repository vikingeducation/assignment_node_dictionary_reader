// Given a callback
// Prompt the user to select a dictionary
// Pass that dictionary and callback into the loader

const menu = require('./menu');
const load = require('../io/loader');
const findDicts = require('../io/findDicts');

function init(callback) {
  findDicts((err, options) => {
    if (err) throw err;
    options['q'] = 'Quit';
    menu('Select a dictionary to load:', options, selection => {
      if (selection === 'q') {
        process.exit();
      }
      load(options[selection], callback);
    });
  });
}

module.exports = init;
