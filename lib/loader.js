fs = requre('fs');

function load(path, callback) {
  let dictStream = fs.createReadStream(path, 'utf8');

  dictStream.on('data', data => {});
}

module.exports = load;
