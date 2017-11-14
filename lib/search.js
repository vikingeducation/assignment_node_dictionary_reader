const exactMatch = (dictionaryData, searchWord) => {
  let keys = Object.keys(dictionaryData)
  let match = new RegExp(`${searchWord}`)
  return match.exec(keys)[0]
}

const beginMatch = (dictionaryData, beginsWith) => {
  let keys = Object.keys(dictionaryData)
  return keys.map((item) => {
    if(item.indexOf(beginsWith) === 0){
      return item
    }
  })
  //return match.exec(keys)[0]

}

module.exports = {
  beginMatch,
  exactMatch
}
