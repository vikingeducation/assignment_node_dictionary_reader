var colorizer = require('./colorizer');

class Search {
  constructor(dict) {
    this.dict = dict;
  }
  exact(query, callback) {
    var matches = [];
    if (this.dict[query]) {
      matches.push(query);
    }
    this.matches = matches;
    displaySearchResults(matches);
  }
  partial(query) {
    var regex = new RegExp(`(${query})`, 'gi');
    this._performSearch(regex);
  }
  beginsWith(query) {
    var regex = new RegExp(`^(${query}).*$`, 'gi');
    this._performSearch(regex);
  }
  endsWith(query) {
    var regex = new RegExp(`^.*(${query})$`, 'gi');
    this._performSearch(regex);
  }
  _performSearch(regex) {
    var matches = [];
    for (var word in this.dict) {
      if (regex.test(word)) {
        if (!matches.includes(word)) {
          matches.push(word);
        };
      };
      var strArray = this.dict[word].split(' ');
      strArray.forEach(element => {
        if (regex.test(element)) {
          element = element.toLowerCase().replace(/[.,;!?':)("`]/g,'');
          element = element.replace(/(--)$/,'');
          if (!matches.includes(element)) {
            matches.push(element);
          };
        };
      });
    }
    this.matches = matches;
    displaySearchResults(matches);
  }
}

function displaySearchResults(matches) {
  var count = colorizer.colorize(matches.length, 'red');
  console.log('');
  console.log(`Found ${count} match(es):`);
  matches.forEach(match => {console.log(match)});
}

module.exports = Search;
