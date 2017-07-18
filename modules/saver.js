'use strict';

const fs = require('fs');
const DATA_FOLDER = './data/';

const SAVER = {
	results: null,
	check: filename => {
		return new Promise((resolve, reject) => {
			// Attempt to read the file, if it throws an error
			// it does not exist? Maybe?
			fs.readFile(filename, err => {
				if (err) {
					resolve(filename);
				} else {
					reject(filename);
				}
			});
		});
	},
	save: filename => {
		return new Promise((resolve, reject) => {
			fs.writeFile(DATA_FOLDER + filename), err => {
				if (err) reject(err);
				resolve(true);
			};
		});
	}
};

module.exports = SAVER;
