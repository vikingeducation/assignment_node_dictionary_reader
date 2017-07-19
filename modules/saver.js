'use strict';

const fs = require('fs');
const DATA_FOLDER = './data/';

const SAVER = {
	results: null,
	filename: '',
	check: filename => fs.existsSync(DATA_FOLDER + filename),
	save: () => {
		SAVER.results = SAVER.results.map(el => `${el.word}: ${el.def}`).join('\n');
		return new Promise((resolve, reject) => {
			fs.writeFile(DATA_FOLDER + SAVER.filename, SAVER.results, err => {
				if (err) reject(err);
				resolve(true);
			});
		});
	}
};

module.exports = SAVER;
