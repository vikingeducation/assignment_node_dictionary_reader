var fs = require('fs');

var dictionaries = [];

// Push all JSON files to dictionaries
fs.readdir('./data', 'utf8', (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    if (file.endsWith('.json')) {
      dictionaries.push(file);
    }
  });
});

module.exports = {
  dictionaries: dictionaries
};
