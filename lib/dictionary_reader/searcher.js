var colorizer = require('./colorizer');

class Search {
  constructor(dict) {
    this.dict = dict;
  }
  exact(query) {
    var matches = [];
    if (this.dict[query]) {
      matches.push(query);
    }
    var count = colorizer.colorize(matches.length, 'red');
    console.log('');
    console.log(`Found ${count} match(es):`);
    console.log(matches[0]);
  }
  partial(query) {
    var regex = new RegExp(`(${query})`, 'gi');

  }
  beginsWith(query) {

  }
  endsWith(query) {

  }
}

module.exports = Search;
