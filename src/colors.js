const chalk = require('chalk');

class Colorize {
  yellow(str) {
    return chalk.yellow(str);
  }

  blue(str) {
    return chalk.blue(str);
  }

  green(str) {
    return chalk.green(str);
  }

  red(str) {
    return chalk.red(str);
  }
}

const colorize = new Colorize();
module.exports = colorize;
