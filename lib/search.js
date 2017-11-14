let search = (searchType, searchParams, dict) => {
  let regexCurrent = '';
  switch (searchType) {
    case '1':
      regexCurrent = `^${searchParams}$`;
      console.log(regexCurrent);
      break;
    case '2':
      regexCurrent = `${searchParams}`;
      console.log(regexCurrent);

      break;
    case '3':
      regexCurrent = `^${searchParams}`;
      console.log(regexCurrent);

      break;
    case '4':
      regexCurrent = `${searchParams}$`;
      console.log(regexCurrent);
      break;
  }
  let regex = new RegExp(regexCurrent, 'i');
  // console.log(regexCurrent);
  let resultsArray = [];
  for (let key in dict) {
    let match = regex.test(key);
    if (match) {
      resultsArray.push(key);
    }
  }
  // let match = regex.exec(dict);
  // while (match) {
  //   resultsArray.push(match);
  //   match = regex.exec(dict);
  // }
  return resultsArray;
};
module.exports = search;
