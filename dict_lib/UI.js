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
			    if(data == 'q' || data == 'Q' || data == "quit"){
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

			if(data == 'cancel' || data == 'c'){
				process.stdin.pause();
      			process.stdin.removeListener('data', onData);
      			userInterface.start_UI();
			}

			else if(parseInt(data.match(/\d+/)) < arr.length+1){
				var user_number = parseInt(data.match(/\d+/)[0])-1;
				var selected_folder = arr[user_number];
				saving.process_file(selected_folder);
			}

			else{
				console.log(`Sorry, we didn't recognize your command ${data}`);
			}
		}

		process.stdin.on('data', onData);
	}
}

module.exports = userInterface;