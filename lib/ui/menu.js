const prompt = require('./prompt');

function menu(message, acceptable, callback) {
  // Show message
  console.log(message);

  // Display options
  for (let option in acceptable) {
    console.log(`${option}. ${acceptable[option]}`);
  }

  // Handle input
  prompt(null, selection => {
    if (Object.keys(acceptable).includes(selection)) {
      // The user unput an acceptable selection
      callback(selection);
    } else {
      // Retry
      console.log(`Sorry ${selection} is not a valid option.`);
      menu(message, acceptable, callback);
    }
  });
}

module.exports = menu;
