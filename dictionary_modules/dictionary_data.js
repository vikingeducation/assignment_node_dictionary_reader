const wordCount = function (dictionaryObj) {
    let amountOfWords = 0;
    for (let key in dictionaryObj) {
        amountOfWords++;
    }

    return amountOfWords;
}



const letterFrequency = function (dictionaryObj) {
    let letter;
    let alphabet = {}

    //Object key being letters and value being a number (count)
    'abcdefghijklmnopqrstuvwyxz'.split("").forEach((elem) => {
        alphabet[elem] = 0;
    })

    //increment value of each key (letter) in the alphabet object depending on the first letter of the key value in the json file
    for (let key in dictionaryObj) {
        letter = key.charAt(0).toLocaleLowerCase();
        alphabet[letter]++;

    }

    return alphabet;
}

module.exports = {
    wordCount: wordCount,
    letterFrequency: letterFrequency
}