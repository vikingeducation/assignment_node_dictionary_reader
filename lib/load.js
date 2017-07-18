const fs = require('fs');

//create a readStream

dicts = {
    getDicts: function(callback) {
        fs.readdir('../data', function(err, data) {
            if (err) throw err;

            console.log("DATA: " + data);
            callback(data);
        });
    }
    getFile: function (fileName, callback) {
        fs.readFile('../data/' + fileName, );
    }
}

module.exports = dicts;
