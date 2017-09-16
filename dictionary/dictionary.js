var fs = require('fs');

module.exports = {
  load: (file) => {
    fs.readFile(`./data/${ file }`, 'utf8', function (err, data) {
      if (err) throw err;

      var dictionary = JSON.parse(data);
      var alphabetString = 'abcdefghijklmnopqrstuvwxyz';
      var alphabet = alphabetString.toUpperCase().split('');
      var dictionaryWords = Object.keys(dictionary);

      console.log(`Successfully loaded: ${ file }`);
      console.log(`Word Count: ${ dictionaryWords.length }`);

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
      }
    });
  }
};
