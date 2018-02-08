var path = require('path');
var fs = require('fs');
const async = require('async');

var obj = {dev: "/data/kitties.json", prod: "/data/dictionary.json"};
var entries = {};

async.forEachOf(obj, (value, key, callback) => {
  fs.readFile(__dirname + value, "utf8", (err, data) => {
    if (err) return callback(err);
    try {
      entries[key] = JSON.parse(data);
    } catch (e) {
      return callback(e);
    }
    callback();
  });
}, err => {
  if (err) console.error(err.message);
    // entries is now a map of JSON data
    getWords(entries);
  });

function getWords (data){
  var dictionaryWords = Object.keys(data)
  return dictionaryWords
}


