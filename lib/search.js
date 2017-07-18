let search = {
	exactMatch: function (dict, str) {
		str = str.trim();
		let keys = Object.keys(dict);
		//let matches = [];
		let count = 0;
		for (let i = 0; i < keys.length; i ++ ) {
			if (str === keys[i]){
				count++;
			}
		}
		return { 'count': count, 'str': str };
	},
	partialMatches: function (dict, str) {
		str = str.trim();
		let keys = Object.keys( dict );
		let matches = [];
		let reg = new RegExp( str, 'i' );
		for ( let i = 0; i < keys.length; i++ ){
			//str is regex
			if ( reg.test( keys[i]) ){
				matches.push( keys[i] );
			}
		}
		return matches;
	},
	beginsWith: function( dict, str ){
		str = str.trim();
		let keys = Object.keys( dict );
		let matches = [];
		let reg = new RegExp( '^' + str , 'i' );
		for ( let i = 0; i < keys.length; i++ ){
			//str is regex
			if ( reg.test( keys[i]) ){
				matches.push( keys[i] );
			}
		}
		return matches;
	},
	endsWith: function( dict, str ){
		str = str.trim();
		let keys = Object.keys( dict );
		let matches = [];
		let reg = new RegExp( str + '$' , 'i' );
		for ( let i = 0; i < keys.length; i++ ){
			//str is regex
			if ( reg.test( keys[i]) ){
				matches.push( keys[i] );
			}
		}
		return matches;
	}

}


module.exports = search;
