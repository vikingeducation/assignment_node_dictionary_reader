let loader = require('./loading');


function exactMatch(input, dictionary){
  // if (dictionary[input] !== undefined){
  //   console.log(dictionary[input])
  //   return dictionary[input];
  // } else {
  //   console.log('not found')
  // }
  console.log(dictionary[input])
};

module.exports = {
	exactMatch: exactMatch
}
