let search = (searchType, searchParams, dict) => {
  searchParams = searchParams.trim();
  let regexCurrent = '';
  switch (searchType) {
    case '1':
      regexCurrent = `^${searchParams}$`;
      break;
    case '2':
      regexCurrent = `${searchParams}`;

      break;
    case '3':
      regexCurrent = `^${searchParams}`;

      break;
    case '4':
      regexCurrent = `${searchParams}$`;
      break;
  }
  let regex = new RegExp(regexCurrent, 'i');
  let resultsArray = [];
  let dictArray = Object.keys(dict);
  for (let i = 0; i < dictArray.length; i++) {
    let match = regex.test(dictArray[i]);
    if (match) {
      resultsArray.push(dictArray[i]);
    }
  }

  return resultsArray;
};
module.exports = search;
