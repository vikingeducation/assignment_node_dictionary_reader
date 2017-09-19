var fs = require('fs');
var chalk = require('chalk');

var handleDataWrite = (dictionary, results, path) => {
  var obj = {};

  for(var i = 0; i < results.length; i++) {
    obj[`${ results[i] }`] = dictionary[results[i]];
  }

  var json = JSON.stringify(obj, null, ' ');

  fs.writeFile(`./data/${ path }`, json, 'utf8', (err) => {
    if (err) throw err;
    console.log(chalk.green('The file has been saved!\nThanks for using Node Dictionary!'));
    process.exit();
  });
};

var handleOverwrite = (dictionary, results, path) => {
  // ask if overwrite
  process.stdout.write(chalk.blue("\nThat file exists, overwrite? y/n? 'q' quits.\n> "));

  process.stdin.once('data', (answer) => {
    answer = answer.toLowerCase().trim();

    if (answer === 'q' || answer === 'quit') {
      process.exit();
    } else if (answer === 'n' || answer === 'no') {
      getFilePathAnswer(dictionary, results);
    } else if (answer === 'y' || answer === 'yes') {
      // Overwrite data
      handleDataWrite(dictionary, results, path);
    } else {
      process.stdout.write(chalk.red(`\n${ answer } is not a valid option.\n`));
      // Ask again
      handleOverwrite(dictionary, results, path);
    }
  });
};

var getFilePathAnswer = (dictionary, results) => {
  process.stdout.write(chalk.blue("\nWhat filepath should we write results to?\n> "));

  process.stdin.once('data', (path) => {
    path = path.toLowerCase().trim();

    if (path === 'q' || path === 'quit') {
      process.exit();
    } else if (!path.endsWith('.json')) {
      process.stdout.write(chalk.red('\nFilename must end in .json\n'));
      getFilePathAnswer(dictionary, results);
    } else {
      if (fs.existsSync(`./data/${ path }`)) {
        handleOverwrite(dictionary, results, path);
      } else {
        handleDataWrite(dictionary, results, path);
      }
    }
  });
};

var getSaveAnswer = (dictionary, results) => {
  process.stdout.write(chalk.green("\nDo you want to save results? y/n? 'q' quits.\n> "));

  process.stdin.once('data', (saveAnswer) => {
    saveAnswer = saveAnswer.toLowerCase().trim();

    if (saveAnswer === 'q' || saveAnswer === 'quit') {
      process.exit();
    } else if (saveAnswer === 'y' || saveAnswer === 'yes') {
      getFilePathAnswer(dictionary, results);
    } else if (saveAnswer === 'n' || saveAnswer === 'no') {
      process.stdout.write(chalk.green('\nThank you for using Dictionary. Have a nice day!\n'));
      process.exit();
    } else {
      process.stdout.write(chalk.red(`\n${ saveAnswer } is not a valid option.\n`));
      getSaveAnswer(dictionary, results);
    }
  });
};

module.exports = {
  init: (dictionary, results) => {
    getSaveAnswer(dictionary, results);
  }
};
