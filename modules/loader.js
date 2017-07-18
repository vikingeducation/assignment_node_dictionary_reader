'use strict';

const fs = require('fs');

const DATA_FOLDER = '../data/'

module.exports = {
  track: 
  scan: () => {
    fs.readdir(DATA_FOLDER, (err, data) => {
      if (err) {
        throw err;
      }
      return data.filter( element => element.endsWith('.json')) ;
    });

  }

}