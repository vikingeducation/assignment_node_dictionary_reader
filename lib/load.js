const fs = require('fs');

//create a readStream

dicts = {
	getDicts: function() {
		fs.readdir('../data', function(err, data) {
		  let p = new Promise((res, rej) => {
		  	if (err) {
		  		reject(err)
		  	} else {
		  		resolve(data);
		  	}
		  });

		  return p;
		});
	}
}

module.exports = dicts;