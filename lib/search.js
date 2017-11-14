let search = (searchType, searchParams, dict) =>{
  let regexCurrent = '';
  switch(searchType){
    case 1:
      regexCurrent = `^${searchParams}$`;
      break;
    case 2:
      regexCurrent = `${searchParams}`;
      break;
    case 3:
      regexCurrent = `^${searchParams}`;
      break;
    case 4:
      regexCurrent = `${searchParams}$`
      break
  }
  let regex = new RegExp(regexCurrent);
  let resultsArray = [];
  let match = regex.exec(dict);
  while(match){
    resultsArray.push(match);
    match = regex.exec(dict);
  }
  return resultsArray;
}
module.exports = search;
