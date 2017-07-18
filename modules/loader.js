'use strict';

const fs = require('fs');
const DATA_FOLDER = './data/';

const LOADER = {
	track: [],
	selectedDictionary: null,
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
				LOADER.track = data.filter(element => element.endsWith('.json'));

				resolve(LOADER.track);
			});
		});
	},
	init: selection => {
		return new Promse((resolve, reject) => {
			// Set the selected dictionary.
			LOADER.selectedDictionary = LOADER.track[selection - 1];

			if (LOADER.selectedDictionary) {
			}
		});
	}
};

module.exports = LOADER;
