'use strict';

const fs = require('fs');

const DATA_FOLDER = './data/';

module.exports = {
	track: [],
	scan: () => {
		return new Promise((resolve, reject) => {
			fs.readdir(DATA_FOLDER, (err, data) => {
				if (err) {
					reject(err);
				}
				if (data === undefined) {
					reject(Error('Folder is empty.'));
				}

				// If we get here, success.
				module.exports.track = data.filter(element => element.endsWith('.json'));
				
				resolve(module.exports.track);
			});
		});
	}
};
//(element => element.endsWith('.json'))