let loader = require('./loading');


function exactMatch(input, dictionary){
  console.log(dictionary[input])
};

function partialMatch(input, dictionary) {
  let regex = new RegExp(input)
	let keys = Object.keys(dictionary);

  const matches = [];

  for (let i = 0; i < keys.length; i++) {
    const word = keys[i];
    if (regex.test(word)) {
      matches.push(word);
    }
  }

  // error handling todo

  for (let j = 0; j < matches.length; j++) {
  	console.log(matches[j]);
  }
}

function startsWithMatch(input, dictionary) {
	let regex = new RegExp('^' + input);
	let keys = Object.keys(dictionary);

	const matches = [];

	keys.forEach((word) => {
		if (regex.test(word)) {
			matches.push(word)
		}
	});

	matches.forEach((word) => {
		console.log(word);
	});
}

function endsWithMatch(input, dictionary) {

	let regex = new RegExp(input + '$', 'm');
	console.log(regex)
	let keys = Object.keys(dictionary);

	const matches = [];

	keys.forEach((word) => {
		if (regex.test(word)) {
			matches.push(word)
		}
	});

	matches.forEach((word) => {
		console.log(word);
	});
}

module.exports = {
	exactMatch: exactMatch,
	partialMatch: partialMatch,
	startsWithMatch: startsWithMatch,
	endsWithMatch: endsWithMatch
}









