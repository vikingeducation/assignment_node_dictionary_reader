// Optionally display a message to the user
// Wait for some input and pass that input into a given callback

function prompt(message, callback) {
  if (message) console.log(message);
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
