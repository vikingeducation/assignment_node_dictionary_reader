var load = require('./load');
var currentDictionaryBuf = load.load.readDictionary('./data/' + load.dictFileArray[0]);
var currentDictionary = load.getCurrentDict(currentDictionaryBuf);


var search = {
  exact: (dictionary) => {

  },
  partial: (dictionary) => {

  },
  beginsWith: (dictionary) => {

  },
  endsWith: (dictionary) => {

  }
};

search.exact(currentDictionary);

module.exports = {
  search
}
