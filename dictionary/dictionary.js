var fs = require('fs');
var chalk = require('chalk');

module.exports = {
  load: (file) => {
    var loadFile = new Promise((resolve, reject) => {
      fs.readFile(`./data/${ file }`, 'utf8', (err, data) => {
        if (err) throw err;

        var dictionary = JSON.parse(data);
        var alphabetString = 'abcdefghijklmnopqrstuvwxyz';
        var alphabet = alphabetString.toUpperCase().split('');
        var dictionaryWords = Object.keys(dictionary);

        console.log(chalk.green(`Successfully loaded: ${ file }`));
        console.log(chalk.blue(`Word Count: ${ dictionaryWords.length }`));

        console.log('Word frequency by starting letter:');
        for (var i = 0; i < alphabet.length; i++) {
          var letter = alphabet[i].toLowerCase();

          var applicableWords = [];

          dictionaryWords.forEach((word) => {
            if (word.startsWith(`${ letter }`)) {
              applicableWords.push(word);
            }
          });

          console.log(`${ alphabet[i] }: ${ applicableWords.length }`);

          if (i === alphabet.length - 1) { // If last letter, resolve promise
            resolve();
          }
        }
      });
    });

    return loadFile;
  }
};
