let dictionaries = {};

function loading() {
  const fs = require('fs');

  let path = './data/'
  fs.readdir(path, (err, data) => {
    let regex = 
    if (err){
      throw err
    }
    let filtered = data.filter((/\.(json)$/i)
      data.forEach((file, i) =>{
          dictionaries[i+1] = file
    })
    console.log(dictionaries)
  })
}


module.exports = {
  loading: loading,
  // dictionaries: dictionaries
}
