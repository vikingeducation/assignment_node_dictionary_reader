'use strict';

const SEARCHER = {
	search_menu: ['Exact', 'Partial', 'Begins With', 'Ends With'],
	searchType: 0,
	setSearchType: selection => {
		
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
				if (key.includes(searchString)) {
				
					definitions[key] = entries[key];
				}
			}

			return definitions;
		},
		'Begins With': (searchString, entries) => {
			let definitions = [];
			for (var key in entries) {
				if (key.startsWith(searchString)) {
				
					definitions[key] = entries[key];
				}
			} 
			return definitions;
		},
		'Ends With': (searchString, entries) => {
			let definitions = [];
			for (var key in entries) {
				if (key.endsWith(searchString)) {
				
					definitions[key] = entries[key];
				}
			}
			return definitions;
		}
	}
};

module.exports = SEARCHER;
