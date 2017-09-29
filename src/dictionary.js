const fs = require('fs');

function getSummary(fileName) {
  console.log(`Successfully loaded: ${fileName}`);

  process.stdin.resume();
  process.stdin.on('data', (input) => {
    input = input.trim();

    if (input === 'q') {
      console.log('Goodbye');
      process.exit();
    }
  });


  fs.readFile('./data/' + fileName, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    // convert JSON string to JS object
    const words = Object.keys(JSON.parse(data));
    console.log(`Word Count: ${words.length}`);

    // return object with number of occurences of each first letter of dictionary word
    const occurence = getFirstLetterOccurence(words);

    // loop through the object and log out occurence of each letter
    for (let letter in occurence) {
      console.log(`${letter}: ${occurence[letter]}`);
    }
  });
}

function getFirstLetterOccurence(wordsArr) {
  const firstLetterOccurence = wordsArr.reduce((acc, word) => {
    const letter = word[0].toLowerCase();

    if (acc[letter]) {
      acc[letter] += 1;
    } else {
      acc[letter] = 1;
    }

    return acc;
  }, {});

  return firstLetterOccurence;
}


module.exports = getSummary;
