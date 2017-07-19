// Return an object containing the frequency of words starting with each
// letter in a given dictionary

function countFrequency(data) {
  let counts = {};
  for (let word in data) {
    if (counts[word[0]]) {
      counts[word[0]] += 1;
    } else {
      counts[word[0]] = 1;
    }
  }

  return counts;
}

module.exports = countFrequency;
