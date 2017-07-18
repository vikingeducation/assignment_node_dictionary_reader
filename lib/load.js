const fs = require('fs');

//create a readStream

let dicts = {
    getDicts: function(callback) {
        fs.readdir('../data', function(err, data) {
            if (err) throw err;

            console.log("DATA: " + data);
            callback(data);
        });
    },
    // Using fs.createReadStream

    getFile: function (fileName, callback) {
        //fs.readFile('../data/' + fileName, );
        //let file =
        let file = fs.createReadStream('../data/' + fileName, 'utf-8');
        let line_breaks = 0;
        let word_count = 0;

        file.on('data', (data) => {
          ///parsing here instead??
          //find line_breaks
          // line_breaks++;
          console.log( data )
          //regex
          //data.find
          //' '
        });

        file.on('end', () =>{
          //do callback
          callback();
        })

    }


}

module.exports = dicts;
