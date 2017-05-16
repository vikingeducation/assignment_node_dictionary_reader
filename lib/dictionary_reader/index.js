const ui = require('./ui');
const save = require('./save');
const search = require('./search');
const load = require('./load');
const wrapper = require('./dictionary_wrapper');

const init = () => {
  ui.init();
  // console.log('Just placeholder text for now!');
};

module.exports = {
  init: init
};