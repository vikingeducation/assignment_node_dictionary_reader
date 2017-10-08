const fs = require('fs');
const PATH = './data';
let userFilenameInput; // global var stores user's inputed filename (eg, results.txt)

const saveFile = (jsonResults) => {

	console.log("Do you want to save results? y/n? '\\q' quits.");
	process.stdout.write('> ');

	process.stdin.resume();
	process.stdin.setEncoding('utf8');

	//#3 - overwrite?
	let getUserOverwriteInput = (data) => {
		let userOverwriteInput = data.trim();
		if ( (userOverwriteInput === '\\q') || (userOverwriteInput === 'n') ) {
			console.log('Goodbye!');
			process.exit();
		} else {
			process.stdin.removeListener('data', getUserOverwriteInput);
			let path = `${PATH}/${userFilenameInput}`;
			let message = 'File successfully overwritten!';
			saveFile(path, jsonResults, message);
		}
	}

	//#2 - filename?
	let getUserFilenameInput = (data) => {
		userFilenameInput = data.trim();
		if (userFilenameInput === '\\q') {
			console.log('Goodbye!');
			process.exit();
		} else {
			process.stdin.removeListener('data', getUserFilenameInput);
			attemptSave(userFilenameInput);
		}
	}

	//#1 - save?
	let getUserSaveInput = (data) => {
		let userSaveInput = data.trim();
		if ((userSaveInput === '\\q') || (userSaveInput === 'n')) {
			console.log('Goodbye!');
			process.exit();
		} else {
			if (userSaveInput === 'y') {
				process.stdin.removeListener('data', getUserSaveInput);
				//
				//GOTO next state
				//				
				getUserFilename();
			} else {
				console.log("Do you want to save results? y/n? '\\q' quits.");
				process.stdout.write('> ');				
			}
		}
	}
	process.stdin.on('data', getUserSaveInput);

	let attemptSave = (file) => {
		let path = `${PATH}/${file}`;
		fs.open(path, 'wx', (err, fd) => {
			if (err) {
				//
				//GOTO next state (overwrite)
				//
				getUserOverwrite();
			} else {
				let message = 'File saved!';
				saveFile(path, jsonResults, message);
			}	
		});
	}

	let saveFile = (path, jsonResults, message) => {
		fs.writeFile(path, jsonResults, 'utf8', (err) => {
			if (err) throw err;
			console.log(message);
			console.log('Goodbye!');
			process.exit();			
		});
	};

	//#2 overwrite?
	let getUserOverwrite = (path) => {
		console.log("That file exists, overwrite? y/n? '\\q' quits.");
		process.stdout.write('> ');			
		process.stdin.on('data', getUserOverwriteInput);
	}

	//#2 filename?
	let getUserFilename = () => {
		console.log('What filepath should we write results to?');
		process.stdout.write('> ');	
		process.stdin.on('data', getUserFilenameInput);
	}
}

module.exports = {
	save: saveFile
}
