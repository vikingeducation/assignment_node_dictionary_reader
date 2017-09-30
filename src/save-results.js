const fs = require('fs');


const saveResults = {
  save: function(saveFileName, data) {
    fs.writeFile('./data/' + saveFileName, data, (err) => {
      if (err) {
        throw err;
      }

      console.log(`Successfully saved to file: ${saveFileName}`);
    })
  },
}



module.exports = saveResults;
