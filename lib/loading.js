var fs = require('fs')

//var loadfile = (path) => {
//}

var pathdictionary = './data/dictionary.json'

var dictionary = fs.readFile(pathdictionary, 'utf8', (err, data) => {
  //if(err){throw 'file not found'}
  console.log(JSON.parse(data))
})

//console.log(dictionary);
