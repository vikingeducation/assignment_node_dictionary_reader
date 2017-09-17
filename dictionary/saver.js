var fs = require('fs');
var chalk = require('chalk');

var fsExistsSync = (file) => {
  try {
    fs.accessSync(file);
    return true;
  } catch (e) {
    return false;
  }
};

var getSaveAnswer = (file, results) => {
  process.stdout.write(chalk.green("\nDo you want to save results? y/n? 'q' quits.\n> "));

  process.stdin.once('data', (data) => {
    data = data.toLowerCase().trim();

    if (data === 'q' || data === 'quit') {
      process.exit();
    } else if (data === 'y' || data === 'yes') {
      getFilePathAnswer(file, results);
    } else if (data === 'n' || data === 'no') {
      process.stdout.write(chalk.green('\nThank you for using Dictionary. Have a nice day!\n'));
      process.exit();
    } else {
      process.stdout.write(chalk.red(`\n${ data } is not a valid option.\n`));
      getSaveAnswer(file, results);
    }
  });
};

var getFilePathAnswer = (file, results) => {
  process.stdout.write(chalk.blue("\nWhat filepath should we write results to?\n> "));

  process.stdin.once('data', (data) => {
    data = data.toLowerCase().trim();

    if (data === 'q' || data === 'quit') {
      process.exit();
    } else if (!data.endsWith('.json')) {
      process.stdout.write(chalk.red('\nFilename must end in .json\n'));
      getFilePathAnswer(file, results);
    } else {
      handleFileSave(file, results, data);
    }
  });
};

var handleOverwrite = (file, results, input) => {
  // ask if overwrite
  process.stdout.write(chalk.blue("\nThat file exists, overwrite? y/n? 'q' quits.\n> "));

  process.stdin.once('data', (data) => {
    data = data.toLowerCase().trim();

    if (data === 'q' || data === 'quit') {
      process.exit();
    } else if (data === 'n' || data === 'no') {
      getFilePathAnswer(file, results);
    } else if (data === 'y' || data === 'yes') {
      // Overwrite data
      handleDataWrite(file, results, input);
    } else {
      process.stdout.write(chalk.red(`\n${ data } is not a valid option.\n`));
      // Ask again
      handleOverwrite(file, results);
    }
  });
};

var handleFileSave = (file, results, input) => {
  // If the file exists
  if (fsExistsSync(`./data/${ input }`)) {
    handleOverwrite(file, results, input);
  } else {
    handleDataWrite(file, results, input);
  }
};

var handleDataWrite = (file, results, input) => {
  var obj = {};

  new Promise((resolve, reject) => {
    fs.readFile(`./data/${ file }`, 'utf8', (err, data) => {
      if (err) throw err;

      var dictionary = JSON.parse(data);

      for(var i = 0; i < results.length; i++) {
        obj[`${ results[i] }`] = dictionary[results[i]];

        if (i === results.length -1) {
          resolve();
        }
      }
    });
  }).then(() => {
    var json = JSON.stringify(obj, null, ' ');

    fs.writeFile(`./data/${ input }`, json, 'utf8', (err) => {
      if (err) throw err;
      console.log(chalk.green('The file has been saved!\nThanks for using Node Dictionary!'));
      process.exit();
    });
  });
};

module.exports = {
  init: (file, results) => {
    getSaveAnswer(file, results);
  }
};
