const fs = require('fs');

class Dictionary {

  constructor(path, filename) {
    this.words = this.loadFile(path, filename);
    this.wordFreq = this.countWordFreq();
  }

  loadFile(path, filename){
    let fileString = fs.readFileSync(`${path}/${filename}`, 'utf8');
    if (fileString) return JSON.parse(fileString);
  }

  wordCount() {
    return Object.keys(this.words).length;
  }

  countWordFreq() {
    let freq = {};
    let dict = this.words;
    for (let word in dict) {
      let firstLetter = word[0].toUpperCase();
      if (freq[firstLetter]) {
        freq[firstLetter]++;
      } else {
        freq[firstLetter] = 1;
      }
    }
    return freq;
  }

}

module.exports = Dictionary;
