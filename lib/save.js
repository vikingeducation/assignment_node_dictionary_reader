const fs = require("fs");

saveStuff = {
	save: function(dict, results, file_name, callback) {
		//if error

		let formattedResult = "";

		for (let i = 0; i < results.length; i++) {
			formattedResult += `${results[i]}: ${dict[results[i]]}\n\n`;
		}

		// console.log(formattedResult);

		fs.writeFile('../files/' + file_name, formattedResult, "utf8", function(err) {
			if (err) throw err;
			callback();
		});
	}
}

module.exports = saveStuff;