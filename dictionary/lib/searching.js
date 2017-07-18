let loader = require('./loading');


function exactMatch(input, dictionary){
  console.log(dictionary[input])
};

function partialMatch(input, dictionary) {
	let str = Object.keys(dictionary).join(' ');
	let reggie = new RegExp("/(" + input + ")/g");

	console.log(reggie);

	var matches = [];
	var match = reggie.exec(str);

	while(match) {
	  matches.push(match);
	  match = reggie.exec(str);
	}

	console.log(matches);
}

module.exports = {
	exactMatch: exactMatch,
	partialMatch: partialMatch
}
