var chalk = require('chalk');

var Colorizer = {};

Colorizer.colorize = (str, color) => {
  let outputColor = chalk.keyword(color);
  return outputColor(str);
};


module.exports = Colorizer;
