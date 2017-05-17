const _runSearch = (regex, dictionary) => {
  let results = [];
  for (let word in dictionary) {
    if (regex.test(word)) {
      results.push(word);
    }
  }
  return results;
};

const exact = (input, dictionary) => {
  let results = [];
  if (dictionary[input]) {
    results.push(input);
  } else {
    results.push("");
  }
  return results; 
};

const partial = (input, dictionary) => {
  let partialSearch = new RegExp(`(${ input })`, "gi");
  let results = _runSearch(partialSearch, dictionary);
  return results;
};

const beginsWith = (input, dictionary) => {
  let beginsWithSearch = new RegExp(`^(${ input })[a-z]*$`, "gi");
  let results = _runSearch(beginsWithSearch, dictionary);
  return results;
};

const endsWith = (input, dictionary) => {
  let endsWithSearch = new RegExp(`^[a-z]*(${ input })$`, "gi");
  let results = _runSearch(endsWithSearch, dictionary);
  return results;
};

const isValid = (input) => {
  let alphaCheck = /^[a-z]+$/;
  return alphaCheck.test(input);
};

const methods = {
  1: exact,
  2: partial,
  3: beginsWith,
  4: endsWith
};

module.exports = {
  methods: methods,
  isValid: isValid
};