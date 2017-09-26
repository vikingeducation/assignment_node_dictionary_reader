const colorizer = require('./colorizer');

let matches;

class Search {
  constructor(dict) {
    this.dict = dict;
  }
  exact(query) {
    matches = [];
    if (this.dict[query]) {
      matches.push(query);
    }
    this.matches = matches;
    _displaySearchResults(matches, this.dict);
  }
  partial(query) {
    const regex = new RegExp(`(${query})`, 'gi');
    this._performSearch(regex);
  }
  beginsWith(query) {
    const regex = new RegExp(`^(${query}).*$`, 'gi');
    this._performSearch(regex);
  }
  endsWith(query) {
    const regex = new RegExp(`^.*(${query})$`, 'gi');
    this._performSearch(regex);
  }
  _performSearch(regex) {
    matches = [];
    let strArray;
    for (let word in this.dict) {
      if (regex.test(word)) {
        if (!matches.includes(word)) {
          matches.push(word);
        }
      }
      strArray = this.dict[word].split(' ');
      strArray.forEach((element) => {
        if (regex.test(element)) {
          element = element.toLowerCase().replace(/[.,;!?':)("`]/g,'');
          element = element.replace(/(--)$/,'');
          if (!matches.includes(element)) {
            matches.push(element);
          }
        }
      });
    }
    this.matches = matches;
    _displaySearchResults(matches, this.dict);
  }
}

function _displaySearchResults(results, dict) {
  const count = colorizer.colorize(results.length, 'red');
  // console.log('');
  console.log(`\nFound ${count} match(es):`);
  results.forEach((result) => {
    console.log(`${result}: ${dict[result]}`);
  });
}

module.exports = Search;
