'use strict';

const SEARCHER = {
	search_menu: ['Exact', 'Partial', 'Begins With', 'Ends With'],
	searchType: 0,
	setSearchType: selection => {
		console.log(selection);
		SEARCHER.searchType = +selection - 1;
	},
	search: {
		execute: (searchString, entries) => {
			return SEARCHER.search[SEARCHER.search_menu[SEARCHER.searchType]](
				searchString,
				entries
			);
		},
		Exact: (searchString, entries) =>
			entries[Object.keys(entries).find(el => el === searchString)],
		Partial: (searchString, entries) => {
			let definitions = [];
			for (var key in entries) {
				if (!entries.hasOwnProperty(key) && key.includes(searchString)) {
					console.log(key);
					definitions[key] = entries[key];
				}
			}

			return definitions;
		},
		'Begins With': (searchString, entries) => {},
		'Ends With': (searchString, entries) => {}
	}
};

module.exports = SEARCHER;
