
// Dictionary data module

let letterCount = (words) => {
  letter_count = {};
  for (let i = 0; i < words.length; i++) {
    if (letter_count[words[i][0].toLowerCase()] === undefined) {
      letter_count[words[i][0].toLowerCase()] = 1;
    } else {
      letter_count[words[i][0].toLowerCase()] += 1;
    }
  }
  return letter_count;
}




module.exports.loadInformation = (data) => {
  console.log("Successfully loaded data");
  console.log("Word count: ");
}
