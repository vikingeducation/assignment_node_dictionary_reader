const chalk = require('chalk');

const Colorizer = {};

Colorizer.colorize = (str, color) => {
  const outputColor = chalk.keyword(color);
  return outputColor(str);
};


module.exports = Colorizer;
