

function search(dictionary, callback) {
  // do the search
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  function onData(data) {
    process.stdin.pause();
    process.stdin.removeListener('data', onData);
    data = data.trim();

    let definition = dictionary[data];
    if (definition) {
      callback(null, dictionary, data, definition);
    } else {
      callback(`Sorry, I couldn't find ${data}`, dictionary);
    }
  }
  process.stdin.on('data', onData);
}



module.exports = search;
