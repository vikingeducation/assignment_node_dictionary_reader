let loader = require('./loading');


function exactMatch(input, dictionary){
  console.log(dictionary[input])
};

function partialMatch(input, dictionary) {

  regex = new RegExp(input)
	let keys = Object.keys(dictionary);

  const matches = [];
  for (let i = 0; i < keys.length; i++) {
    const word = keys[i];
    if (regex.test(word)) {
      matches.push(word);
    }
  }


  console.log(matches);


	// let reggie = new RegExp(input, 'g');
  //
  // // let pattern = `/${input}/g`
  //
	// var matches = [];
	// var match = reggie.exec(str);
  // // console.log(match);
	// while(match) {
	//   matches.push(match);
	//   match = reggie.exec(str);
	// }
  //
  // // var re = new RegExp(pattern, 'gi');
  // // // var result = [];
  // // // result.push(re.test(str));
  // // console.log(re.exec(str));

}

module.exports = {
	exactMatch: exactMatch,
	partialMatch: partialMatch
}
