'use strict';

const SEARCHER = {
	search_menu: ['Exacty', 'Partial', 'Begins With', 'Ends With'],
  searchType: 0
  setSearchType: 
	search: {
		Exact: (searchString, entries) => entries[Object.keys(entries).find((el) => el === searchString)],
		Partial: () => {},
		'Begins With': () => {},
		'Ends With': () => {}
	}
};

module.exports = SEARCHER;
