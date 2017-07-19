function prompt(message, callback) {
  console.log(message);
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  let onData = data => {
    data = data.trim();
    process.stdin.pause();
    process.stdin.removeListener('data', onData);
    callback(data);
  };
  process.stdin.on('data', onData);
}

module.exports = prompt;
