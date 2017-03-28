const cli = require('../lib/cliModule');
const loader = require('../lib/loader');
const Dictionary = require('../lib/dictionary');

const stats = {

  fileList: loader.getJSONFiles('./data'),

  prompt: () => {
    return stats.getLoadedDict();
  },

  getLoadedDict: () => {
    str = `Successfully loaded:`
    return `${str} ${stats.fileList[stats.data - 1]}`
  },

  getWordCount: () => {

  }

};

module.exports = (data) => {
  stats.data = data;
  return stats;
}