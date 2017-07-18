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
