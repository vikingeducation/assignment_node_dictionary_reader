var fs = require('fs');
var UI = require('./UI.js');

var Loader = {
	scan: function(){
		return new Promise((resolve, reject) => {
			fs.readdir('data', (err, data) => {
				if(err){
					reject(err);
				}
				resolve(Loader.find_JSON_files(data));
			});
			})
	},

	find_JSON_files: function(arr){
		var returned_arr = [];
		var regex = /.json/gi;
		for(var file in arr){
			console.log(`${parseInt(file)+1} Found ${arr[file]}`);
			returned_arr.push(arr[file]);
		}
		console.log(`\n`);
		return returned_arr;
	},
}

module.exports = Loader;