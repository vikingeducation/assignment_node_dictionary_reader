var index = require("./index.js");
var loader = require('./loader.js');
var saving = require('./saving.js');
var dictData = require('./dictData.js');
var searching = require('./searching.js');
var welcome_string = `
	Welcome to Node Dictionary Reader
	---------------------------------

	Press Q to quit
`;


var userInterface = {
	test: function(){
		console.log('test');
	},

	start_UI: function(){
			  process.stdin.resume();
			  process.stdin.setEncoding('utf8');

			  var showMessage = (err, str) => {
			    if (err) {
			      console.error(err);
			    }
			  };

			  showMessage(welcome_string);

			  var onData = (data) => {
			    data = data.trim();

			    //quit
			    if(data.toLowerCase() == 'q' || data.toLowerCase() == "quit"){
			    	console.log("Goodbye!");
			    	process.exit();
			    }

			    //load file view
			    if (data === 'load') {
			    	process.stdin.pause();
      				process.stdin.removeListener('data', onData);
			    	loader.scan().then(function(results){
			    		userInterface.loader_UI(results);
			    	});
			    } 

			    else {
			      showMessage(`Invalid Command ${ data }`);
			    }
			  };

			  process.stdin.on('data', onData);
	},

	loader_UI: function(arr){
		process.stdin.resume();
  		process.stdin.setEncoding('utf8');
		console.log('Which one would you like to load? (select a number)');
		console.log("Or enter C or cancel to go back to main app\n");

		var onData = function(data){
			var data = data.trim();

			if(data.toLowerCase() == 'cancel' || data.toLowerCase() == 'c'){
				process.stdin.pause();
      			process.stdin.removeListener('data', onData);
      			userInterface.start_UI();
			}

			else if(parseInt(data.match(/\d+/)) < arr.length+1){
				var user_number = parseInt(data.match(/\d+/)[0])-1;
				var selected_folder = arr[user_number];
				dictData.process_file(selected_folder).then((results) => {
					process.stdin.pause();
      				process.stdin.removeListener('data', onData);
					userInterface.start_searchUI(selected_folder);
				})
			}

			else{
				console.log(`Sorry, we didn't recognize your command ${data}`);
			}
		}

		process.stdin.on('data', onData);
	},

	start_searchUI: function(file){
		process.stdin.resume();
  		process.stdin.setEncoding('utf8');
  		var searchUI_str = `
  		${file}
  			---------------------
  			What kind of search would you like to perform? (Default: Exact)
			1: Exact
			2: Partial
			3: Begins With
			4: Ends With

			---------------------

			Remember: c or cancel goes back to the main app
			use command 'change' to use a different search method

  		`;
  		console.log(searchUI_str);

  		//type of search
  		var search;

  		var onData = function(data){
  			data = data.trim();

  			if(data.toLowerCase() == 'cancel' || data.toLowerCase() == 'c'){
				process.stdin.pause();
      			process.stdin.removeListener('data', onData);
      			userInterface.start_UI();
			}

			else if(data.match(/[1-4]/)){
				var user_number = data.match(/[1-4]/)[0];
				if(user_number == 1){ search = "exact" }
				if(user_number == 2){ search = "partial" }
				if(user_number == 3){ search = "beginning" }
				if(user_number == 4){ search = "end" }
				console.log('Enter search term: ');
			}

			else if(data === "change"){
				//end currenty process
				process.stdin.pause();
      			process.stdin.removeListener('data', onData);
      			
				//recursive call to 'restart' view
				userInterface.start_searchUI(file);
			}

			else if(data.match(/[a-zA-z]+/)){
				var search_term = data.match(/[a-zA-z]+/);
				console.log(`search term: ${search_term}`);
				console.log(`-----------------------------\n`)
				if(search == 'exact'){ searching.search_exact(file, search_term)}
				if(search == 'partial'){ searching.search_partial(file, search_term, 'partial')}
				if(search == 'beginning'){ searching.search_partial(file, search_term, 'beginning')}
				if(search == 'end'){ searching.search_partial(file, search_term, 'end')}
			}

			else{
				console.log(`Sorry, we didn't recognize your command ${data}`);
			}
  		}

  		process.stdin.on('data', onData);
	}
}

module.exports = userInterface;