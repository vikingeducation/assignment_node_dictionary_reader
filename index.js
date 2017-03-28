var fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf8');

console.log("Welcome to the Node Dictionary Reader!\n\
======================================\n\
Enter q to quit\n\n");

function selectionInterface(){
	console.log("Select Dictionary to Load:")

	fs.readdir('./data/', (err, dir) => {
		if(err) throw err;
		dict = dir;
		dict.forEach( (el) => {
			console.log(`1. ${el}`);
		});
	});

	process.stdin.on('data', (str) => {
		str = str.trim();
	});
}


selectionInterface();
