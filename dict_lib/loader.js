var fs = require('fs');
var UI = require('./UI.js');
UI.test();

var Loader = {
	scan: function(){
		fs.readdir('data', (err, data) => {
			if(err){
				throw err;
			}

			var files = Loader.find_JSON_files(data);
			//UI.test();
		});
	},

	find_JSON_files: function(arr){
		var returned_arr = [];
		var regex = /.json/gi;
		for(var file in arr){
			console.log(`${parseInt(file)+1} Found ${arr[file]}`);
			returned_arr.push(arr[file]);
		}
		return returned_arr;
	},
}

module.exports = Loader;